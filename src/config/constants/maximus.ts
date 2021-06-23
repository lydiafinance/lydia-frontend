import { ChainId } from '@lydiafinance/sdk'
import tokens from './tokens'
import { MaximusConfig } from './types'

const pools: MaximusConfig[] = [
  {
    pid: 2,
    lpSymbol: 'AVAX-ETH',
    contractAddress: {
      [ChainId.FUJI]: '0x60096143052e7b0A1466D4B10f8Efe614ba83B26',
      [ChainId.AVALANCHE]: '0x558E7E24b39f869E2C1AbB039360A3536D850ab2',
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
  {
    pid: 1,
    lpSymbol: 'USDT-AVAX',
    contractAddress: {
      [ChainId.FUJI]: '0x4fAE2067785ED460408670dc01A3d2A8a416bb6F',
      [ChainId.AVALANCHE]: '0x4fAE2067785ED460408670dc01A3d2A8a416bb6F',
    },
    stakingToken: {
      [ChainId.FUJI]: '0xe22a65204726f102d9e3539b85d3999dee2e421f',
      [ChainId.AVALANCHE]: '0xe22a65204726f102d9e3539b85d3999dee2e421f',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2.5',
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 4,
    lpSymbol: 'AVAX-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0xBdA30098dD8A5b27C90146EfB295bC0ecf3553F3',
      [ChainId.AVALANCHE]: '0x07F9B7b1FeD6a71AF80AC85d1691A4EC0EBE370b',
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
    pid: 7,
    lpSymbol: 'PNG-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0x4fAE2067785ED460408670dc01A3d2A8a416bb6F',
      [ChainId.AVALANCHE]: '0x7d0Cc15C9d3740E18a27064b8EFfE5EbAA7944e7',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0x161f750b753c7120599d07c352607F458ecB918e',
    },
    earningToken: tokens.png,
    tokenPerBlock: '2.5',
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
]

export default pools
