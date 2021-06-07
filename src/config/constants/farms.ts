import { ChainId } from '@lydiafinance/sdk'

import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'LYD',
  //   lpAddresses: {
  //     [ChainId.FUJI]: '0x520b56F7C10364F2d56D9B380E0886dAcBde4e1c',
  //     [ChainId.AVALANCHE]: '0x45E43f8A4b43a53230b19B08dB3061A4FB421A4D',
  //   },
  //   token: tokens.electrum,
  //   quoteToken: tokens.wavax,
  // },
  {
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
  {
    pid: 4,
    lpSymbol: 'AVAX-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xfba4edaad3248b03f1a3261ad06ad846a8e50765',
    },
    token: tokens.lyd,
    quoteToken: tokens.wavax,
    tokenSymbol: 'LYD',
    quoteTokenAdresses: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 7,
    lpSymbol: 'PNG-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0x161f750b753c7120599d07c352607F458ecB918e',
    },
    token: tokens.png,
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
  {
    pid: 9,
    lpSymbol: 'ETH-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xEAC3778e5658667B72aEbe8C71F97ed8b3b5887b',
    },
    token: tokens.eth,
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
  {
    pid: 10,
    lpSymbol: 'SNOB-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x1ccd24def23a742d56a976810ca5bda37b43744d',
      [ChainId.AVALANCHE]: '0x805B7d20e92893FF4b68c83E40c1Fc9A7a6162Fa',
    },
    token: tokens.snob,
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
  {
    pid: 11,
    lpSymbol: 'XAVA-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x5BC783079e9A04c67436D6E712D5e73099c08f16',
      [ChainId.AVALANCHE]: '0x5BC783079e9A04c67436D6E712D5e73099c08f16',
    },
    token: tokens.xava,
    quoteToken: tokens.lyd,
    quoteTokenSymbol: 'LYD',
  },
  {
    pid: 1,
    lpSymbol: 'USDT-AVAX LP',
    lpAddresses: {
      [ChainId.FUJI]: '0xb239eafea4e312f9409f96493a5f24bb4a23af18',
      [ChainId.AVALANCHE]: '0xe22a65204726f102d9e3539b85d3999dee2e421f',
    },
    token: tokens.usdt,
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 2,
    lpSymbol: 'ETH-AVAX LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x1ccd24def23a742d56a976810ca5bda37b43744d',
      [ChainId.AVALANCHE]: '0x58128ab3ecbf703682ede72f341944bffe3524b9',
    },
    token: tokens.eth,
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 6,
    lpSymbol: 'SUSHI-AVAX LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x1ccd24def23a742d56a976810ca5bda37b43744d',
      [ChainId.AVALANCHE]: '0xF1d9d971ab9231759d952B22223B4D76D8b181E5',
    },
    token: tokens.sushi,
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
  {
    pid: 8,
    lpSymbol: 'WBTC-AVAX LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x1ccd24def23a742d56a976810ca5bda37b43744d',
      [ChainId.AVALANCHE]: '0x9cfb46d0b92ac83aaa9ed0913f3f01cdbe22176d',
    },
    token: tokens.wbtc,
    quoteToken: tokens.wavax,
    quoteTokenSymbol: 'AVAX',
  },
]

export default farms
