import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@lydiafinance/uikit'
import { ifosConfig } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const { t } = useTranslation()

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Title as="h2">{t('How to take part')}</Title>
          <Heading mb="16px">{t('Before Sale')}:</Heading>
          <List>
            <li>{t('Buy LYD and AVAX tokens')}</li>
            <li>{t('Get LYD-AVAX LP tokens by adding LYD and AVAX liquidity')}</li>
          </List>
          <Flex mb="16px">
            <LinkExternal href="https://exchange.lydia.finance/#/swap" mr="16px">
              {t('Buy LYD')}
            </LinkExternal>
            <LinkExternal href="https://exchange.lydia.finance/#/add/AVAX/">{t('Get LP tokens')}</LinkExternal>
          </Flex>
          <Heading mb="16px">{t('During Sale')}:</Heading>
          <List>
            <li>{t('While the sale is live, commit your LYD-LP tokens to buy the IFO tokens')}</li>
          </List>
          <Heading mb="16px">{t('After Sale')}:</Heading>
          <List>
            <li>{t('Claim the tokens you bought, along with any unspent funds.')}</li>
            <li>{t('Done!')}</li>
          </List>
          <Text as="div" pt="16px">
            <Button
              as="a"
              variant="secondary"
              href="https://docs.lydia.finance/core-products/ifo-initial-farm-offering"
            >
              {t('Read more')}
            </Button>
          </Text>
        </div>
        <div>
          <Image src="/images/ifo-bunny.svg" alt="ifo bunny" width={436} height={406} responsive />
          <div>
            <Title as="h2">{t('Want to launch your own IFO?')}</Title>
            <Text mb={3}>
              {t(
                'Launch your project with LydiaFinance, Avalanche’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on AVAX.',
              )}
            </Text>
            <Button
              as="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLScGdT5rrVMr4WOWr08pvcroSeuIOtEJf1sVdQGVdcAOqryigQ/viewform"
              external
            >
              {t('Apply to launch')}
            </Button>
          </div>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
