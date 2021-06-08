/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  MetamaskIcon,
  Text,
  TooltipText,
  LinkExternal,
  TimerIcon,
  Skeleton,
  useTooltip,
  Button,
} from '@lydiafinance/uikit'
import { BASE_AVAX_SCAN_URL } from 'config'
import { Maximus } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import Balance from 'components/Balance'

interface ExpandedFooterProps {
  pool: Maximus
  account: string
  performanceFee?: number
  isAutoVault?: boolean
  totalLydInVault?: BigNumber
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({
  pool,
  account,
  performanceFee = 0,
  isAutoVault = false,
  totalLydInVault,
}) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, totalStaked, isFinished, contractAddress } = pool

  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''
  const poolContractAddress = getAddress(contractAddress)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-end' },
  )

  return (
    <ExpandedWrapper flexDirection="column">
      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        <Text small>{t('Total staked:')}</Text>
        <Flex alignItems="flex-start">
          {totalStaked ? (
            <>
              <Balance
                fontSize="14px"
                value={
                  isAutoVault
                    ? getBalanceNumber(totalLydInVault, stakingToken.decimals)
                    : getBalanceNumber(totalStaked, stakingToken.decimals)
                }
              />
              <Text ml="4px" fontSize="14px">
                {stakingToken.symbol}
              </Text>
            </>
          ) : (
            <Skeleton width="90px" height="21px" />
          )}
        </Flex>
      </Flex>

      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef} small>
          {t('Performance Fee')}
        </TooltipText>
        <Flex alignItems="center">
          <Text ml="4px" small>
            {performanceFee / 100}%
          </Text>
        </Flex>
      </Flex>

      <Flex mb="2px" justifyContent="flex-end">
        <LinkExternal
          bold={false}
          small
          href={`https://exchange.lydia.finance/#/add/AVAX/0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084`}
        >
          {t(`Get  ${pool.lpSymbol}`)}
        </LinkExternal>
      </Flex>

      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-end">
          <LinkExternal bold={false} small href={`${BASE_AVAX_SCAN_URL}/address/${poolContractAddress}`}>
            {t('View Contract')}
          </LinkExternal>
        </Flex>
      )}

      <Flex mb="2px" justifyContent="flex-end">
        <LinkExternal bold={false} small href={`${BASE_AVAX_SCAN_URL}/address/${poolContractAddress}`}>
          {t('See Pair Info')}
        </LinkExternal>
      </Flex>
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
