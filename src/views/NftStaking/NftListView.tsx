import React from 'react'
import { Card, CardBody, CardFooter, Button, Text, Link, CardHeader, Breadcrumbs, Checkbox } from '@lydiafinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import useGetAvaxLionsNfts from 'hooks/useGetAvaxLionsNfts'
import { ManageLayout } from './styles'

const NftListView = ({ title, emptyText, buttonText }) => {
  const { t } = useTranslation()

  const { nfts, isLoading } = useGetAvaxLionsNfts()
  console.log(nfts, isLoading)

  const isEmpty = nfts.length === 0

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
                <div className="nft-card" key={nft.tokenId}>
                  <div className="nft-image">
                    <img src={nft.tokenData.image} alt={`token-${nft.tokenId}`} />
                  </div>
                  <div className="nft-details">
                    <div>
                      <Checkbox scale="sm" />
                      {nft.tokenData.name}
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          )}
          <CardFooter className="manage-footer">
            <Button disabled={isEmpty && isLoading} variant="danger">
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
      </ManageLayout>
    </Page>
  )
}

export default NftListView
