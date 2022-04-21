import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Card, CardBody, CardFooter, Button } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { BIG_ZERO } from 'utils/bigNumber'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useNftStakeContract } from 'hooks/useContract'
import useGetAvaxLionsStakedNfts from 'hooks/useGetAvaxLionsStakedNfts'
import useToast from 'hooks/useToast'
import useGetAvaxLionsNfts from 'hooks/useGetAvaxLionsNfts'
import { BannerImageContainer, ManageLayout, NftPageHeader, BannerTextContainer } from './styles'
import NftWithdrawListView from './NftWithdrawListView'
import NftStakeListView from './NftStakeListView'
import OverviewNftItem from './OverviewNftItems'

const NftStaking: React.FC = () => {
  const nftStakeContract = useNftStakeContract()
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [loading, setLoading] = useState(true)
  const [totalStaked, setTotalStaked] = useState(0)
  const [balanceOf, setBalanceOf] = useState(0)
  const [earned, setEarned] = useState(BIG_ZERO)
  const [isClaiming, setIsClaiming] = useState(false)
  const isEarned = BIG_ZERO.comparedTo(earned) !== 0

  const { nfts: stakedNfts, isLoading: isLoadingStakedNfts } = useGetAvaxLionsStakedNfts()
  const { nfts: availableNfts, isLoading: isLoadingAvailableNfts } = useGetAvaxLionsNfts()

  const emptyWalletBalance = availableNfts.length === 0
  const emptyContractBalance = stakedNfts.length === 0

  const { toastSuccess, toastWarning, toastError } = useToast()

  const handleClaimClick = async () => {
    setIsClaiming(true)

    try {
      await nftStakeContract.methods
        .getReward()
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
        .on('confirmation', () => {
          toastSuccess(t('Success!'), t('You have successfully claimed your rewards.'))
        })
    } catch ({ code }) {
      if (code === 4001) {
        toastWarning(t('Info'), t('Denied transaction signature.'))
      } else {
        toastError(t('Error'), t('Please refresh your page...'))
      }
    } finally {
      setIsClaiming(false)
    }
  }

  useEffect(() => {
    const fetchNfts = async () => {
      if (account) {
        try {
          const { balanceOf: getBalanceOf, totalSupply: getTotalSupply, earned: getEarned } = nftStakeContract.methods

          const [_balanceOf, _totalSupply, _earned] = await makeBatchRequest([
            getBalanceOf(account).call,
            getTotalSupply().call,
            getEarned(account).call,
          ])

          setTotalStaked(Number(_totalSupply))
          setEarned(new BigNumber(Number(_earned)).shiftedBy(-18))
          setBalanceOf(Number(_balanceOf))
        } catch (e) {
          console.log(e)
        } finally {
          setLoading(false)
        }
      }
    }

    if (account) {
      fetchNfts()
    } else {
      setLoading(false)
    }
  }, [account, nftStakeContract, isClaiming])

  return (
    <>
      <NftPageHeader>
        <BannerTextContainer justifyContent="center" alignItems="center" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="text" mb="24px">
              {t('NFT Staking')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Stake AvaxLions to earn LYD!')}
            </Heading>
          </Flex>
        </BannerTextContainer>
        <BannerImageContainer>
          <img src="/images/nft-stake/banner.png" alt="banner" />
        </BannerImageContainer>
      </NftPageHeader>
      {loading && (
        <Page>
          <FlexLayout>
            <Card>
              <CardBody>{t('Please wait...')}</CardBody>
            </Card>
          </FlexLayout>
        </Page>
      )}
      {!account && !loading && (
        <Page>
          <FlexLayout>
            <Card>
              <CardBody>{t('Please connect your wallet')}</CardBody>
            </Card>
          </FlexLayout>
        </Page>
      )}
      {account && (
        <>
          <Route exact path={`${path}`}>
            <Page>
              <ManageLayout>
                <Card className="manage">
                  <CardBody>{t('Total Staked')}</CardBody>
                  <CardFooter>
                    <Heading scale="lg" color="text">
                      {totalStaked} {t('AvaxLions')}
                    </Heading>
                  </CardFooter>
                </Card>
                <Card isActive className="manage">
                  <CardBody className="manage-header">
                    {t('Your unclaimed LYD')}{' '}
                    {isEarned && (
                      <Button onClick={handleClaimClick} variant="primary" disabled={isClaiming}>
                        {isClaiming ? t('Claiming') : t('Claim')}
                      </Button>
                    )}
                  </CardBody>
                  <CardBody className="manage-body">
                    <Heading scale="lg" color="text">
                      {earned.toFixed(5).toString()}
                    </Heading>
                  </CardBody>
                </Card>
              </ManageLayout>
              <ManageLayout>
                <Card isWarning className="button-card overview-nft">
                  <CardBody className="manage-header">
                    {t('Your Available AvaxLions:')}
                    <Heading scale="lg" color="text">
                      {availableNfts.length}
                    </Heading>
                  </CardBody>
                  {!isLoadingAvailableNfts && !emptyWalletBalance && (
                    <a href="/nft-stake/stake">
                      <CardBody className="overview-body">
                        {availableNfts.map((nft) => (
                          <OverviewNftItem key={nft.tokenId} nft={nft} />
                        ))}
                      </CardBody>
                    </a>
                  )}
                  <CardFooter className="manage-footer">
                    <Button className="manage-btn" as="a" href="/nft-stake/stake" variant="danger">
                      {t('Stake NFTs')}
                    </Button>
                  </CardFooter>
                </Card>
                <Card isSuccess className="button-card overview-nft">
                  <CardBody className="manage-header">
                    {t('Your Avax Lion deposits:')}
                    <Heading scale="lg" color="text">
                      {stakedNfts.length}
                    </Heading>
                  </CardBody>
                  {!isLoadingStakedNfts && !emptyContractBalance && (
                    <a href="/nft-stake/withdraw">
                      <CardBody className="overview-body">
                        {stakedNfts.map((nft) => (
                          <OverviewNftItem key={nft.tokenId} nft={nft} />
                        ))}
                      </CardBody>
                    </a>
                  )}
                  <CardFooter className="manage-footer">
                    <Button className="manage-btn" as="a" href="/nft-stake/withdraw" variant="danger">
                      {t('Withdraw NFTs')}
                    </Button>
                  </CardFooter>
                </Card>
              </ManageLayout>
            </Page>
          </Route>
          <Route exact path={`${path}/stake`}>
            <NftStakeListView />
          </Route>
          <Route exact path={`${path}/withdraw`}>
            <NftWithdrawListView />
          </Route>
        </>
      )}
    </>
  )
}

export default NftStaking
