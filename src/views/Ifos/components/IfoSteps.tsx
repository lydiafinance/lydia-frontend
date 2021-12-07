import React from 'react'
import styled from 'styled-components'
import { Stepper, Step, Card, CardBody, Heading, Text, Button, Link, OpenNewIcon } from '@lydiafinance/uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const IfoSteps: React.FC = () => {
  const { t } = useTranslation()

  const stepsValidationStatus = [true, true, true]

  const renderCardBody = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Get LYD-AVAX LP Tokens')}
            </Heading>
            <Text color="textSubtle" small>
              {t('Stake LYD and AVAX in the liquidity pool to get LP tokens.')} <br />
              {t('You’ll spend them to buy IFO sale tokens.')}
            </Text>
            <Button
              as={Link}
              external
              href={`${BASE_ADD_LIQUIDITY_URL}/AVAX/0xc7198437980c041c805A1EDcbA50c1Ce5db95118`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t('Get LP tokens')}
            </Button>
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Commit LP Tokens')}
            </Heading>
            <Text color="textSubtle" small>
              {t('When the IFO sales are live, you can “commit” your LP tokens to buy the tokens being sold.')}
            </Text>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Claim your tokens')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'After the IFO sales finish, you can claim any IFO tokens that you bought, and any unspent LYD-AVAX LP tokens will be returned to your wallet.',
              )}
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" scale="xl" color="secondary" mb="24px" textAlign="center">
        {t('How to Take Part')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} index={index} status="future">
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
