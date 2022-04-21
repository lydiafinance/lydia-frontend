import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Button, Text, Link, CardHeader, Breadcrumbs } from '@lydiafinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useNftStakeContract } from 'hooks/useContract'
import { ManageLayout } from './styles'
import NftListItemView from './NftListItemView'

const NftListView = ({ title, emptyText, buttonText, withdrawMode = false, nfts, isLoading, refresh }) => {
  const nftStakeContract = useNftStakeContract()
  const { account } = useWeb3React()
  const [isPending, setPending] = useState(false)
  const { t } = useTranslation()
  const [selectedItems, setSelectedItems] = useState([])
  const isEmpty = nfts.length === 0

  const handleSelect = ({ tokenId }) => {
    setSelectedItems([...selectedItems, tokenId])
  }

  const handleDeselect = ({ tokenId }) => {
    setSelectedItems(selectedItems.filter((item) => item !== tokenId))
  }

  const handleStakeEvent = async () => {
    setPending(true)
    try {
      await nftStakeContract.methods
        .stake(selectedItems)
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    } catch (error) {
      console.log(error)
    } finally {
      setPending(false)
      refresh()
    }
  }

  const handleWithdrawEvent = async () => {
    setPending(true)
    try {
      await nftStakeContract.methods
        .withdraw(selectedItems)
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
    } catch (error) {
      console.log(error)
    } finally {
      setPending(false)
      refresh()
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
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
              {nfts.map((nft) => (
                <div className="nft-grid-item">
                  <NftListItemView
                    key={nft.tokenId}
                    onSelectEvent={handleSelect}
                    onDeselectEvent={handleDeselect}
                    nft={nft}
                    isSelected={selectedItems.includes(nft.tokenId)}
                    refresh={refresh}
                  />
                </div>
              ))}
            </CardBody>
          )}
          <CardFooter className="manage-footer">
            <Button
              onClick={withdrawMode ? handleWithdrawEvent : handleStakeEvent}
              disabled={(isEmpty && isLoading) || isPending || selectedItems.length === 0}
              variant="danger"
            >
              {isPending ? 'Pending...' : buttonText}
            </Button>
          </CardFooter>
        </Card>
      </ManageLayout>
    </Page>
  )
}

export default NftListView
