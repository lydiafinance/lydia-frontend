import React from 'react'
import { Card, CardBody, CardFooter, Button, Text, Link, CardHeader, Breadcrumbs, Checkbox } from '@lydiafinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import useGetAvaxLionsNfts from 'hooks/useGetAvaxLionsNfts'
import { ManageLayout } from './styles'
import NftListItemView from './NftListItemView'

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
                <NftListItemView nft={nft} />
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
