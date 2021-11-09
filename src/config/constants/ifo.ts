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
    id: 'maxi',
    address: '0x8BaB8c5576B7e45699c05490886007f00566472c',
    isActive: true,
    name: 'MAXIMUS (MAXI)',
    poolBasic: {
      saleAmount: '60 MAXI',
      raiseAmount: '$1.2',
      lydToBurn: '$0.6',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '140 MAXI',
      raiseAmount: '$2.8',
      lydToBurn: '$1.4',
      distributionRatio: 0.7,
    },
    currency: lydAvaxLPToken,
    token: tokens.maxi,
    releaseTimestamp: 1636552800,
    campaignId: '1',
    articleUrl: 'https://lydiafinance.medium.com/maximus-ifo-on-lydia-finance-dc1009a5cde7',
    tokenOfferingPrice: 0.02,
    version: 2,
    releasePercent: [40, 70, 100],
  },
  {
    id: 'evrt',
    address: '0x66E39268cbBf595FfaAeB17F44fB17cDdd37cd2e',
    isActive: false,
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
    releasePercent: [],
  },
]

export default ifos
