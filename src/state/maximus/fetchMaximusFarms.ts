import BigNumber from 'bignumber.js'
import chunk from 'lodash/chunk'

import poolsConfig from 'config/constants/maximus'
import maximusAbi from 'config/abi/maximusAbi.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

const fetchMaximusFarms = async () => {
  const maximusCalls = poolsConfig.reduce((multiCalls, poolConfig) => {
    const contractAddress = getAddress(poolConfig.contractAddress)

    const currentPoolCals = [
      {
        address: contractAddress,
        name: 'balance',
      },
      {
        address: contractAddress,
        name: 'priceShare',
      },
      {
        address: contractAddress,
        name: 'rewardPerToken',
      },
      {
        address: contractAddress,
        name: 'rewardRate',
      },
      {
        address: contractAddress,
        name: 'rewardsDuration',
      },
      {
        address: contractAddress,
        name: 'rewardsToken',
      },
    ]

    return [...multiCalls, ...currentPoolCals]
  }, [])

  const erc20Cals = poolsConfig.reduce((multiCalls, poolConfig) => {
    const currentPoolCals = [
      {
        address: getAddress(poolConfig.stakingToken),
        name: 'balanceOf',
        params: [getMasterChefAddress()],
      },
      {
        address: getAddress(poolConfig.quoteToken.address),
        name: 'balanceOf',
        params: [getAddress(poolConfig.stakingToken)],
      },
      {
        address: getAddress(poolConfig.stakingToken),
        name: 'totalSupply',
      },
    ]

    return [...multiCalls, ...currentPoolCals]
  }, [])

  let maximusFarmsTotalStacked = await multicall(maximusAbi, maximusCalls)
  let erc20Responses = await multicall(maximusAbi, erc20Cals)

  maximusFarmsTotalStacked = chunk(maximusFarmsTotalStacked, 6)
  erc20Responses = chunk(erc20Responses, 3)

  return [
    ...poolsConfig.map((p, index) => {
      const [lpTokenBalanceMC, quoteTokenBalanceLP, lpTotalSupply] = erc20Responses[index]
      const [totalStaked, priceShare, rewardPerToken, rewardRate, rewardsDuration, rewardsToken] =
        maximusFarmsTotalStacked[index]

      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
        .div(DEFAULT_TOKEN_DECIMAL)
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      const vaultLpTotalInQuoteToken = lpTotalInQuoteToken.times(totalStaked).div(lpTokenBalanceMC)

      return {
        pid: p.pid,
        totalStaked: new BigNumber(totalStaked).toJSON(),
        priceShare: new BigNumber(priceShare).toJSON(),
        rewardPerToken: new BigNumber(rewardPerToken).toJSON(),
        rewardRate: new BigNumber(rewardRate).toJSON(),
        rewardsDuration: new BigNumber(rewardsDuration).toJSON(),
        rewardsToken,
        lpTotalInQuoteTokenNew: vaultLpTotalInQuoteToken.toJSON(),
        lpTokenBalanceMC: new BigNumber(lpTokenBalanceMC).toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
      }
    }),
  ]
}

export default fetchMaximusFarms
