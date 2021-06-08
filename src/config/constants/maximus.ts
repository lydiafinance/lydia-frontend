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
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xEAC3778e5658667B72aEbe8C71F97ed8b3b5887b',
    },
    earningToken: tokens.lyd,
  },
  {
    pid: 0,
    lpSymbol: 'AVAX-ETH',
    contractAddress: {
      [ChainId.FUJI]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
      [ChainId.AVALANCHE]: '0xEF29710BDfCa533D35F3Acc461D79f781398E5D2',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xEAC3778e5658667B72aEbe8C71F97ed8b3b5887b',
    },
    earningToken: tokens.lyd,
  },
]

export default pools
