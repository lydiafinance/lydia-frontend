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
    tokenPerBlock: '2',
    quoteToken: tokens.wavax,
    isFinished: true,
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
    tokenPerBlock: '2',
    quoteToken: tokens.wavax,
    isFinished: true,
  },
  {
    pid: 17,
    lpSymbol: 'USDT.e-AVAX',
    contractAddress: {
      [ChainId.FUJI]: '0xeB3dDd62CF53199593811dae4653321Ce26Ec537',
      [ChainId.AVALANCHE]: '0xeB3dDd62CF53199593811dae4653321Ce26Ec537',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x5Fc70cF6A4A858Cf4124013047e408367EBa1ace',
      [ChainId.AVALANCHE]: '0x5Fc70cF6A4A858Cf4124013047e408367EBa1ace',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.wavax,
  },
  {
    pid: 18,
    lpSymbol: 'AVAX-ETH.e',
    contractAddress: {
      [ChainId.FUJI]: '0x15eCF52152C15029557c89CD9CF9Cf148366BFDC',
      [ChainId.AVALANCHE]: '0x15eCF52152C15029557c89CD9CF9Cf148366BFDC',
    },
    stakingToken: {
      [ChainId.FUJI]: '0xb74791cc65479132b52043b764bbb540439fdf02',
      [ChainId.AVALANCHE]: '0xb74791cc65479132b52043b764bbb540439fdf02',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.wavax,
  },
  {
    pid: 22,
    lpSymbol: 'USDT.e-DAI.e',
    contractAddress: {
      [ChainId.FUJI]: '0xad9aC72aAE3dB711CDcC9FD1142bE46742102354',
      [ChainId.AVALANCHE]: '0xad9aC72aAE3dB711CDcC9FD1142bE46742102354',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x7AbaB5474385918820dfBC7f35712084a91B583a',
      [ChainId.AVALANCHE]: '0x7AbaB5474385918820dfBC7f35712084a91B583a',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.dai_e,
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
    tokenPerBlock: '2',
    quoteToken: tokens.wavax,
  },
  {
    pid: 3,
    lpSymbol: 'USDT-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0xcE1f7DD041cDca5758DAC1f3f0626d454ccf936f',
      [ChainId.AVALANCHE]: '0xcE1f7DD041cDca5758DAC1f3f0626d454ccf936f',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0x752c59f22faaa861108649f4596034796c69bc3f',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.usdt,
    isFinished: true,
  },
  {
    pid: 16,
    lpSymbol: 'USDT.E-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0xdF5C8D10685cbdEA26fed99A3BB1142987345013',
      [ChainId.AVALANCHE]: '0xdF5C8D10685cbdEA26fed99A3BB1142987345013',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x1718309E2AD61A945FCD242F28Dc83339b5d6192',
      [ChainId.AVALANCHE]: '0x1718309E2AD61A945FCD242F28Dc83339b5d6192',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.usdt_e,
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
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.lyd,
  },
  {
    pid: 9,
    lpSymbol: 'ETH-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0x4fAE2067785ED460408670dc01A3d2A8a416bb6F',
      [ChainId.AVALANCHE]: '0x288426B66E1887ce5bFDEA6C87ECEDD97631bc05',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0xEAC3778e5658667B72aEbe8C71F97ed8b3b5887b',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.eth,
    isFinished: true,
  },
  {
    pid: 19,
    lpSymbol: 'ETH.e-LYD',
    contractAddress: {
      [ChainId.FUJI]: '0x036fa505E4D6358a772f578B4031c9AF1af5Bd1D',
      [ChainId.AVALANCHE]: '0x036fa505E4D6358a772f578B4031c9AF1af5Bd1D',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x7Be2c5B9dEE94102cF3920BF7192010Be04D806B',
      [ChainId.AVALANCHE]: '0x7Be2c5B9dEE94102cF3920BF7192010Be04D806B',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.eth_e,
  },
  {
    pid: 12,
    lpSymbol: 'USDT-DAI',
    contractAddress: {
      [ChainId.FUJI]: '0x4fAE2067785ED460408670dc01A3d2A8a416bb6F',
      [ChainId.AVALANCHE]: '0xd21f2B655E3bD698365207B54bB44088E2555119',
    },
    stakingToken: {
      [ChainId.FUJI]: '0x4570BD3910c64095F6C0f5e6405BE7Cb30E2bdd7',
      [ChainId.AVALANCHE]: '0x3cebc2b0febf521494f06318bbe202ae7ee799c9',
    },
    earningToken: tokens.lyd,
    tokenPerBlock: '2',
    quoteToken: tokens.usdt,
    isFinished: true,
  },
]

export default pools
