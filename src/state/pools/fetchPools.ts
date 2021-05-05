import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import lydABI from 'config/abi/lyd.json'
import wavaxABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWavaxAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startTimestamp',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndTimestamp',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((lydPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: lydPoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonAvaxPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'AVAX')
  const avaxPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'AVAX')

  const callsNonAvaxPools = nonAvaxPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsAvaxPools = avaxPool.map((poolConfig) => {
    return {
      address: getWavaxAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonAvaxPoolsTotalStaked = await multicall(lydABI, callsNonAvaxPools)
  const avaxPoolsTotalStaked = await multicall(wavaxABI, callsAvaxPools)

  return [
    ...nonAvaxPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonAvaxPoolsTotalStaked[index]).toJSON(),
    })),
    ...avaxPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(avaxPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
