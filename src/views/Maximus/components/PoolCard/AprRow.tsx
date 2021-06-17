import React, { useMemo } from 'react'
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
}

const AprRow: React.FC<AprRowProps> = ({
  pool,
  isAutoVault = false,
  compoundFrequency = 1,
  performanceFee = 0,
  farms,
}) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, isFinished, tokenPerBlock } = pool
  const { account } = useWeb3React()
  const lydPools = usePools(account)
  const prices = useGetApiPrices()
  const tooltipContent = isAutoVault
    ? t('APY includes compounding, APR doesn’t. This pool’s LYD is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' })
  const _lydPrice = useGetApiPrice('lyd')
  const lydPrice = useMemo(() => new BigNumber(_lydPrice), [_lydPrice])

  const selectedFarm = farms?.length > 0 && farms.find((item) => item.pid === pool.pid)

  const apr = getPoolApr(
    _lydPrice,
    _lydPrice,
    getBalanceNumber(lydPools[0]?.totalStaked, 18),
    parseFloat(tokenPerBlock),
  )

  const quoteTokenPriceUsd = selectedFarm && prices && prices[selectedFarm?.quoteToken?.symbol?.toLowerCase()]
  const totalLiquidity = new BigNumber(selectedFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
  const farmApr = getFarmApr(selectedFarm.poolWeight, lydPrice, totalLiquidity)
  const isHighValueToken = Math.round(_lydPrice / 1000) > 0
  const compoundingApy = useCompoundingApy((farmApr * 1e16).toString(), (apr * 1e16).toString(), 2190)
  const apyModalLink =
    getAddress(stakingToken) && `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${getAddress(stakingToken)}`

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={_lydPrice}
      apr={farmApr}
      linkLabel={`${t('Get')} ${selectedFarm?.quoteToken?.symbol}`}
      linkHref={apyModalLink || BASE_EXCHANGE_URL}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={isHighValueToken ? 4 : 2}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{t('APY (Compound)')}:</TooltipText>
      {!farmApr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance fontSize="16px" value={compoundingApy} decimals={2} unit="%" bold />
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprRow
