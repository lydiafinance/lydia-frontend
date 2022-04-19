import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Button, Text, Link, CardHeader, Breadcrumbs, Checkbox } from '@lydiafinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import useGetAvaxLionsNfts from 'hooks/useGetAvaxLionsNfts'
import { useWeb3React } from '@web3-react/core'
import { useNftStakeContract } from 'hooks/useContract'
import { ManageLayout } from './styles'
import NftListItemView from './NftListItemView'

const NftListView = ({ title, emptyText, buttonText }) => {
  const nftStakeContract = useNftStakeContract()
  const { account } = useWeb3React()

  const { t } = useTranslation()
  const { nfts, isLoading } = useGetAvaxLionsNfts()
  const [selectedItems, setSelectedItems] = useState([])
  const isEmpty = nfts.length === 0

  const handleSelect = ({ tokenId }) => {
    setSelectedItems([...selectedItems, tokenId])
  }

  const handleDeselect = ({ tokenId }) => {
    setSelectedItems(selectedItems.filter((item) => item !== tokenId))
  }

  const handleStakeEvent = async () => {
    try {
      await nftStakeContract.methods
        .stake([100])
        .send({ from: account, gas: 200000 })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    } catch (error) {
      console.log(error)
    } finally {
      console.log('contract write')
    }
  }

  return (
    <Page>
      <ManageLayout className="manage-body">
        <Card className="nft-container-card">
          <CardHeader>
            <Breadcrumbs mb="32px">
              <Link href="/nft-stake" color="secondary" style={{ fontWeight: 400 }}>
                {t('Overview')}
              </Link>
              <Text color="textDisabled">{title}</Text>
            </Breadcrumbs>
          </CardHeader>
          {isEmpty && <CardBody>{isLoading ? t('Please wait...') : emptyText}</CardBody>}
          {!isEmpty && (
            <CardBody className="nft-grid">
              {nfts.map((nft) => (
                <NftListItemView
                  key={nft.tokenId}
                  onSelectEvent={handleSelect}
                  onDeselectEvent={handleDeselect}
                  nft={nft}
                  isSelected={selectedItems.includes(nft.tokenId)}
                />
              ))}
            </CardBody>
          )}
          <CardFooter className="manage-footer">
            <Button onClick={handleStakeEvent} disabled={isEmpty && isLoading} variant="danger">
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </ManageLayout>
    </Page>
  )
}

export default NftListView
