import { ChainId } from '@lydiafinance/sdk'
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

// enableEmergencyWithdraw: true,

// TODO: add mainnet contracts
const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.lyd,
    earningToken: tokens.lyd,
    contractAddress: {
      [ChainId.FUJI]: '0x520b56F7C10364F2d56D9B380E0886dAcBde4e1c',
      [ChainId.AVALANCHE]: '0xFb26525B14048B7BB1F3794F6129176195Db7766',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '2.5',
    sortOrder: 1,
    isFinished: false,
    // TODO: Make SURE!!!!!!!!!!!!!!!!!!!
    // enableEmergencyWithdraw: true,
  },
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
  },
  {
    sousId: 1002,
    stakingToken: tokens.lyd,
    earningToken: tokens.xava,
    contractAddress: {
      [ChainId.FUJI]: '0xFf5d4b8Fd9a73978E0064c8Dd44a2FcAf7b33781',
      [ChainId.AVALANCHE]: '0x6069CFBFc168c4555175fcd6cbB803170A52856B',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.007',
    sortOrder: 1,
    isFinished: true,
  },

  {
    sousId: 1003,
    stakingToken: tokens.lyd,
    earningToken: tokens.olive,
    contractAddress: {
      [ChainId.FUJI]: '0xEe37D6533cFBcC25f841d9677c60e205e2aEa0b7',
      [ChainId.AVALANCHE]: '0xEe37D6533cFBcC25f841d9677c60e205e2aEa0b7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.020695364',
    sortOrder: 1,
    isFinished: true,
  },
  {
    sousId: 1004,
    stakingToken: tokens.lyd,
    earningToken: tokens.wavax,
    contractAddress: {
      [ChainId.FUJI]: '0x89dAA415A13B6146787B4a1EF22dF4Ef7589b0bf',
      [ChainId.AVALANCHE]: '0x89dAA415A13B6146787B4a1EF22dF4Ef7589b0bf',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00027',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
