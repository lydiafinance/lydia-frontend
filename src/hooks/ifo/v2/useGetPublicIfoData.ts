import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useTimestamp, useLpTokenPrice } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import multicall from 'utils/multicall'
import ifoV2Abi from 'config/abi/ifoV2.json'
import { BIG_ZERO } from 'utils/bigNumber'
import { PublicIfoData } from '../types'
import { getStatus } from '../helpers'

// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431
// 1,000,000,000 / 100
const TAX_PRECISION = 10000000000

const formatPool = (pool) => ({
  raisingAmountPool: pool ? new BigNumber(pool[0].toString()) : BIG_ZERO,
  offeringAmountPool: pool ? new BigNumber(pool[1].toString()) : BIG_ZERO,
  limitPerUserInLP: pool ? new BigNumber(pool[2].toString()) : BIG_ZERO,
  hasTax: pool ? pool[3] : false,
  totalAmountPool: pool ? new BigNumber(pool[4].toString()) : BIG_ZERO,
  sumTaxesOverflow: pool ? new BigNumber(pool[5].toString()) : BIG_ZERO,
})

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo): PublicIfoData => {
  const { address, releaseTimestamp } = ifo
  const lpTokenPriceInUsd = useLpTokenPrice(ifo.currency.symbol)
  const { fastRefresh } = useRefresh()

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    timestampRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    poolBasic: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
    },
    poolUnlimited: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
    },
    startTimestampNum: 0,
    endTimestampNum: 0,
  })
  const currentTimestamp = useTimestamp()

  const fetchIfoData = useCallback(async () => {
    const ifoCalls = [
      {
        address,
        name: 'startTimestamp',
      },
      {
        address,
        name: 'endTimestamp',
      },
      {
        address,
        name: 'viewPoolInformation',
        params: [0],
      },
      {
        address,
        name: 'viewPoolInformation',
        params: [1],
      },
      {
        address,
        name: 'viewPoolTaxRateOverflow',
        params: [1],
      },
    ]

    const [startTimestamp, endTimestamp, poolBasic, poolUnlimited, taxRate] = await multicall(ifoV2Abi, ifoCalls)

    const poolBasicFormatted = formatPool(poolBasic)
    const poolUnlimitedFormatted = formatPool(poolUnlimited)

    const startTimestampNum = startTimestamp ? startTimestamp[0].toNumber() : 0
    const endTimestampNum = endTimestamp ? endTimestamp[0].toNumber() : 0
    const taxRateNum = taxRate ? taxRate[0].div(TAX_PRECISION).toNumber() : 0

    const status = getStatus(currentTimestamp, startTimestampNum, endTimestampNum)
    const totalTimestamp = endTimestampNum - startTimestampNum
    const timestampRemaining = endTimestampNum - currentTimestamp

    // Calculate the total progress until finished or until start
    const progress =
      currentTimestamp > startTimestampNum
        ? ((currentTimestamp - startTimestampNum) / totalTimestamp) * 100
        : ((currentTimestamp - releaseTimestamp) / (startTimestampNum - releaseTimestamp)) * 100

    setState((prev) => ({
      ...prev,
      secondsUntilEnd: timestampRemaining,
      secondsUntilStart: startTimestampNum - currentTimestamp,
      poolBasic: { ...poolBasicFormatted, taxRate: 0 },
      poolUnlimited: { ...poolUnlimitedFormatted, taxRate: taxRateNum },
      status,
      progress,
      timestampRemaining,
      startTimestampNum,
      endTimestampNum,
    }))
  }, [address, currentTimestamp, releaseTimestamp])

  useEffect(() => {
    fetchIfoData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh])

  return { ...state, currencyPriceInUSD: lpTokenPriceInUsd, fetchIfoData }
}

export default useGetPublicIfoData
