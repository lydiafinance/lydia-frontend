/* eslint-disable import/newline-after-import */
import React, { useMemo } from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApr, getFarmApr } from 'utils/apr'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'
import { useGetApiPrice, useGetApiPrices } from 'state/hooks'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
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
  stakingTokenPrice,
  isAutoVault = false,
  compoundFrequency = 1,
  performanceFee = 0,
  farms,
}) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, totalStaked, isFinished } = pool
  const prices = useGetApiPrices()
  const tooltipContent = isAutoVault
    ? t('APY includes compounding, APR doesn’t. This pool’s LYD is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' })
  const _lydPrice = useGetApiPrice('lyd')
  const lydPrice = useMemo(() => new BigNumber(_lydPrice), [_lydPrice])

  const selectedFarm = farms?.length > 0 && farms.find((item) => item.pid === pool.pid)

  const apr = getPoolApr(stakingTokenPrice, _lydPrice, getBalanceNumber(totalStaked, stakingToken.decimals), 1)

  const quoteTokenPriceUsd = selectedFarm && prices[selectedFarm?.quoteToken?.symbol?.toLowerCase()]
  const totalLiquidity = new BigNumber(selectedFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
  const farmApr = getFarmApr(selectedFarm.poolWeight, lydPrice, totalLiquidity)

  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(_lydPrice / 1000) > 0
  const roundingDecimals = isHighValueToken ? 4 : 2

  console.log('================|||||||||', farmApr)
  const earningsPercentageToDisplay = () => {
    const oneThousandDollarsWorthOfToken = 1000 / _lydPrice
    const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr,
      tokenPrice: _lydPrice,
      roundingDecimals,
      compoundFrequency,
      performanceFee,
    })
    return getRoi({
      amountEarned: tokenEarnedPerThousand365D,
      amountInvested: oneThousandDollarsWorthOfToken,
    })
  }

  const apyModalLink =
    stakingToken.address &&
    `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={_lydPrice}
      apr={farmApr}
      linkLabel={`${t('Get')} ${stakingToken.symbol}`}
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
      <TooltipText ref={targetRef}>{t('APY')}:</TooltipText>
      {isFinished || !farmApr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={earningsPercentageToDisplay()}
            decimals={2}
            unit="%"
            bold
          />
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprRow
