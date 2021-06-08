import { ChainId } from '@lydiafinance/sdk'
import tokens from './tokens'
import { MaximusConfig } from './types'

const pools: MaximusConfig[] = [
  {
    pid: 0,
    lpSymbol: 'AVAX-ETH',
    contractAddress: {
      [ChainId.FUJI]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
      [ChainId.AVALANCHE]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
    },
    stakingToken: tokens.lyd,
    earningToken: tokens.lyd,
  },
  {
    pid: 0,
    lpSymbol: 'USDT-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
      [ChainId.AVALANCHE]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
    },
    stakingToken: tokens.lyd,
    earningToken: tokens.lyd,
  },
]

export default pools
