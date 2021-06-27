import tokens from './tokens'
import { Ifo, Token } from './types'
import farms from './farms'

const lydAvaxLPToken: Token = {
  symbol: farms[1].lpSymbol,
  address: farms[1].lpAddresses,
  decimals: 18,
}

const ifos: Ifo[] = [
  {
    id: 'kalmar',
    address: '',
    isActive: true,
    name: 'Kalmar (KALM)',
    poolBasic: {
      saleAmount: '375,000 KALM',
      raiseAmount: '$750,000',
      lydToBurn: '$375,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '875,000 KALM',
      raiseAmount: '$2,500,000',
      lydToBurn: '$1,250,000',
      distributionRatio: 0.7,
    },
    currency: lydAvaxLPToken,
    token: tokens.png,
    releaseBlockNumber: 7707736,
    campaignId: '511110000',
    articleUrl: 'https://pancakeswap.medium.com/kalmar-kalm-ifo-to-be-hosted-on-pancakeswap-4540059753e4',
    tokenOfferingPrice: 2.0,
    version: 2,
  },
]

export default ifos
