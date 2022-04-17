import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Card, CardBody, CardFooter, Button, Box, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'

const ManageLayout = styled(FlexLayout)`
  .manage {
    max-width: 62%;
  }

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .manage-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .manage-footer {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 0 5px 0 0;
    }
  }
`

const NftStaking: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()

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
      {!account && (
        <Page>
          <FlexLayout>
            <Card>
              <CardBody>{t('Connect your wallet')}</CardBody>
            </Card>
          </FlexLayout>
        </Page>
      )}
      {account && (
        <Page>
          <FlexLayout>
            <Card>
              <CardBody>{t('Total Staked')}</CardBody>
              <CardFooter>
                <Heading scale="lg" color="text">
                  {t('0 AvaxLions')}
                </Heading>
              </CardFooter>
            </Card>
            <Card isSuccess>
              <CardBody>{t('Your Avax Lion deposits')}</CardBody>
              <CardFooter>
                <Heading scale="lg" color="text">
                  {t('0')}
                </Heading>
              </CardFooter>
            </Card>
          </FlexLayout>
          <ManageLayout>
            <Card className="manage">
              <CardBody className="manage-header">
                {t('Your unclaimed LYD')} <Button variant="primary">{t('Claim')}</Button>
              </CardBody>
              <CardBody className="manage-body">
                <Heading scale="lg" color="text">
                  {t('0.00000')}
                </Heading>
                <Text fontSize="14px">{t('89 LYD / week')}</Text>
              </CardBody>
              <CardBody>
                <Text>⭐️ {t('When you withdraw, the contract will automatically claim LYD on your behalf!')}</Text>
              </CardBody>
              <CardFooter className="manage-footer">
                <Button variant="danger">{t('Stake')}</Button>
                <Button variant="danger">{t('Withdraw')}</Button>
              </CardFooter>
            </Card>
          </ManageLayout>
        </Page>
      )}
    </>
  )
}

export default NftStaking
