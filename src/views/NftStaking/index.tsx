import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Card, CardBody, CardFooter, Button, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import { BIG_ZERO } from 'utils/bigNumber'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useNftStakeContract } from 'hooks/useContract'
import { ManageLayout } from './styles'
import NftListView from './NftListView'

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

  const handleClaimClick = async () => {
    setIsClaiming(true)

    try {
      await nftStakeContract.methods
        .getReward()
        .send({ from: account, gas: 200000 })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    } catch (error) {
      console.log(error)
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
  }, [account, nftStakeContract])

  return (
    <>
      <PageHeader>
        <Flex justifyContent="center" alignItems="center" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="text" mb="24px">
              {t('NFT Stake Farming')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Stake Avax Lions to earn LYD!')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
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
              <FlexLayout>
                <Card>
                  <CardBody>{t('Total Staked')}</CardBody>
                  <CardFooter>
                    <Heading scale="lg" color="text">
                      {totalStaked} {t('Avax Lions')}
                    </Heading>
                  </CardFooter>
                </Card>
                <Card isSuccess>
                  <CardBody>{t('Your Avax Lion deposits')}</CardBody>
                  <CardFooter>
                    <Heading scale="lg" color="text">
                      {balanceOf}
                    </Heading>
                  </CardFooter>
                </Card>
              </FlexLayout>
              <ManageLayout>
                <Card className="manage">
                  <CardBody className="manage-header">
                    {t('Your unclaimed LYD')}{' '}
                    <Button onClick={handleClaimClick} variant="primary" disabled={isClaiming}>
                      {isClaiming ? t('Claiming') : t('Claim')}
                    </Button>
                  </CardBody>
                  <CardBody className="manage-body">
                    <Heading scale="lg" color="text">
                      {earned.toFixed(5).toString()}
                    </Heading>
                  </CardBody>
                  <CardBody>
                    <Text>⭐️ {t('When you withdraw, the contract will automatically claim LYD on your behalf!')}</Text>
                  </CardBody>
                  <CardFooter className="manage-footer">
                    <Button className="manage-btn" as="a" href="/nft-stake/stake" variant="danger">
                      {t('Stake NFTs')}
                    </Button>
                    <Button className="manage-btn" as="a" href="/nft-stake/withdraw" variant="danger">
                      {t('Withdraw NFTs')}
                    </Button>
                  </CardFooter>
                </Card>
              </ManageLayout>
            </Page>
          </Route>
          <Route exact path={`${path}/stake`}>
            <NftListView
              title={t('Available NFTs')}
              buttonText={t('Stake NFTs')}
              emptyText={t('You do not have avax lions')}
            />
          </Route>
          <Route exact path={`${path}/withdraw`}>
            <NftListView
              title={t('Staked NFTs')}
              buttonText={t('Withdraw NFTs')}
              emptyText={t('You do not have staked avax lions')}
              withdrawMode
            />
          </Route>
        </>
      )}
    </>
  )
}

export default NftStaking
