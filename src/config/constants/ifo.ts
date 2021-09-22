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
    id: 'evrt',
    address: '0xEeE752a5c384ff78A123F976F48613815c3dE47A',
    isActive: true,
    name: 'EVEREST DAO (EVRT)',
    poolBasic: {
      saleAmount: '60 EVRT',
      raiseAmount: '$1.2',
      lydToBurn: '$0.6',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '140 EVRT',
      raiseAmount: '$2.8',
      lydToBurn: '$1.4',
      distributionRatio: 0.7,
    },
    currency: lydAvaxLPToken,
    token: tokens.evrt,
    releaseTimestamp: 7707736,
    campaignId: '511110001',
    articleUrl: 'https://lydiafinance.medium.com/everest-dao-ifo-on-lydia-finance-6bf983a5c9ad',
    tokenOfferingPrice: 0.02,
    version: 2,
  },
]

export default ifos
