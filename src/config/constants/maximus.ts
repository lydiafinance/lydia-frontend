import { ChainId } from '@lydiafinance/sdk'
import tokens from './tokens'
import { PoolConfig, PoolCategory, MaximusConfig } from './types'

// enableEmergencyWithdraw: true,

// TODO: add mainnet contracts
const pools: MaximusConfig[] = [
  {
    sousId: 1001,
    stakingToken: tokens.lyd,
    earningToken: tokens.snob,
    contractAddress: {
      [ChainId.FUJI]: '0xFf5d4b8Fd9a73978E0064c8Dd44a2FcAf7b33781',
      [ChainId.AVALANCHE]: '0xf902b496929058eAe5430D7719d0482124eEdE84',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.02',
    sortOrder: 1,
    isFinished: true,

    pid: 3,
    lpSymbol: 'USDT-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0xca3953bb2011aa6a5af2a584562277bde65fa020',
      [ChainId.AVALANCHE]: '0x752c59f22faaa861108649f4596034796c69bc3f',
    },
    token: tokens.usdt,
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
]

export default pools
