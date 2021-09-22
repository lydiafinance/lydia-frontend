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
    address: '0x66E39268cbBf595FfaAeB17F44fB17cDdd37cd2e',
    isActive: true,
    name: 'EVEREST DAO (EVRT)',
    poolBasic: {
      saleAmount: '6,000,000 EVRT',
      raiseAmount: '$120,000',
      lydToBurn: '$60,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '14,000,000 EVRT',
      raiseAmount: '$280,000',
      lydToBurn: '$140,000',
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
