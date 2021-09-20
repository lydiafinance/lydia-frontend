import tokens from './tokens'
import { Ifo, Token } from './types'
import farms from './farms'

const lydAvaxFarm = farms.find((x) => x.pid === 4)

const lydAvaxLPToken: Token = {
  symbol: lydAvaxFarm.lpSymbol,
  address: lydAvaxFarm.lpAddresses,
  decimals: 18,
}

const ifos: Ifo[] = [
  {
    id: 'ftt',
    address: '0x69dd1988cD04ac8dB8E234b033F640AC0bB07b24',
    isActive: true,
    name: 'TEST (FTT)',
    poolBasic: {
      saleAmount: '120 FTT',
      raiseAmount: '$1.2',
      lydToBurn: '$0,6',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '280 FTT',
      raiseAmount: '$2.8',
      lydToBurn: '$1.4',
      distributionRatio: 0.7,
    },
    currency: lydAvaxLPToken,
    token: tokens.test,
    releaseTimestamp: 7707736,
    campaignId: '511110001',
    articleUrl: 'https://lydiafinance.medium.com/everest-dao-ifo-on-lydia-finance-6bf983a5c9ad',
    tokenOfferingPrice: 0.01,
    version: 2,
  },
]

export default ifos
