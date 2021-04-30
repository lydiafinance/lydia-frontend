import BigNumber from 'bignumber.js'
import { SECOND_PER_YEAR, LYD_PER_SECOND } from 'config'

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new lyd allocated to the pool for each new block
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApy = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(SECOND_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param lydPriceUsd LYD price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (poolWeight: BigNumber, lydPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyLydRewardAllocation = LYD_PER_SECOND.times(SECOND_PER_YEAR).times(poolWeight)
  const apy = yearlyLydRewardAllocation.times(lydPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

export default null
