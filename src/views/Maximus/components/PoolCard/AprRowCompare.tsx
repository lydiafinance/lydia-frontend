import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApr, getFarmApr } from 'utils/apr'
import { useWeb3React } from '@web3-react/core'

import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { usePools, useGetApiPrice, useGetApiPrices } from 'state/hooks'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useCompoundingApy } from 'hooks/maximus/maximusActions'
import { Maximus } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'

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

const AprRow: React.FC<AprRowProps> = ({
  pool,
  isAutoVault = false,
  compoundFrequency = 1,
  performanceFee = 0,
  farms,
  isAprCompare,
}) => {
  const { t } = useTranslation()
  const isFinished = false
  const { account } = useWeb3React()
  const prices = useGetApiPrices()
  const tooltipContent = t('This APR Calculated according to the old method regular farming')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' })
  const _lydPrice = useGetApiPrice('lyd')
  const lydPrice = useMemo(() => new BigNumber(_lydPrice), [_lydPrice])

  const selectedFarm = farms?.length > 0 && farms.find((item) => item.pid === pool.pid)

  const quoteTokenPriceUsd = selectedFarm && prices && prices[selectedFarm?.quoteToken?.symbol?.toLowerCase()]
  const totalLiquidity = new BigNumber(selectedFarm.lpTotalInQuoteTokenNew).times(quoteTokenPriceUsd)
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
