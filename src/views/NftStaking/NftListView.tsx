import React from 'react'
import { Card, CardBody, CardFooter, Button, Text, Link, CardHeader, Breadcrumbs } from '@lydiafinance/uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import { ManageLayout } from './styles'

const NftListView = ({ title, emptyText, buttonText }) => {
  const { t } = useTranslation()
  return (
    <Page>
      <ManageLayout className="manage-body">
        <Card className="manage">
          <CardHeader>
            <Breadcrumbs mb="32px">
              <Link href="/nft-stake" color="secondary" style={{ fontWeight: 400 }}>
                {t('Overview')}
              </Link>
              <Text color="textDisabled">{title}</Text>
            </Breadcrumbs>
          </CardHeader>
          <CardBody>{emptyText}</CardBody>
          <CardFooter className="manage-footer">
            <Button variant="danger">{buttonText}</Button>
          </CardFooter>
        </Card>
      </ManageLayout>
    </Page>
  )
}

export default NftListView
