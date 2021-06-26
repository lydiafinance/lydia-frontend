import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Flex, TooltipText, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFarmApr } from 'utils/apr'

import BigNumber from 'bignumber.js'
import { useGetApiPrice, useGetApiPrices } from 'state/hooks'
import Balance from 'components/Balance'
import { Maximus } from 'state/types'

interface AprRowProps {
  pool: Maximus
  stakingTokenPrice: number
  isAutoVault?: boolean
  compoundFrequency?: number
  performanceFee?: number
  farms?: any
  isAprCompare?: any
}

const PreviewWrapper = styled.div`
  opacity: 0.5;

  * {
    font-size: 14px !important;
  }
`

const AprRow: React.FC<AprRowProps> = ({ pool, farms }) => {
  const { t } = useTranslation()
  const isFinished = false
  const prices = useGetApiPrices()
  const tooltipContent = t('This APR Calculated according to the old method regular farming')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' })
  const _lydPrice = useGetApiPrice('lyd')
  const lydPrice = useMemo(() => new BigNumber(_lydPrice), [_lydPrice])

  const selectedFarm = farms?.length > 0 && farms.find((item) => item.pid === pool.pid)

  const quoteTokenPriceUsd = selectedFarm && prices && prices[selectedFarm?.quoteToken?.symbol?.toLowerCase()]
  const totalLiquidity = new BigNumber(selectedFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
  const farmApr = getFarmApr(selectedFarm.poolWeight, lydPrice, totalLiquidity)

  return (
    <PreviewWrapper>
      <Flex alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef}>{t('APR (Normal)')}</TooltipText>

        <Flex alignItems="center">
          <Balance fontSize="14px" isDisabled={isFinished} value={farmApr} decimals={2} unit="%" />
        </Flex>
      </Flex>
    </PreviewWrapper>
  )
}

export default AprRow
