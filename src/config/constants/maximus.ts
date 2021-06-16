import { ChainId } from '@lydiafinance/sdk'
import tokens from './tokens'
import { MaximusConfig } from './types'

const pools: MaximusConfig[] = [
  {
    pid: 4,
    lpSymbol: 'AVAX-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0xBdA30098dD8A5b27C90146EfB295bC0ecf3553F3',
      [ChainId.AVALANCHE]: '0xBdA30098dD8A5b27C90146EfB295bC0ecf3553F3',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xfba4edaad3248b03f1a3261ad06ad846a8e50765',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2.5',
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 2,
    lpSymbol: 'AVAX-ETH',
    contractAddress: {
      [ChainId.FUJI]: '0x60096143052e7b0A1466D4B10f8Efe614ba83B26',
      [ChainId.AVALANCHE]: '0x60096143052e7b0A1466D4B10f8Efe614ba83B26',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x1ccd24def23a742d56a976810ca5bda37b43744d',
      [ChainId.AVALANCHE]: '0x58128ab3ecbf703682ede72f341944bffe3524b9',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2.5',
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
]

export default pools
