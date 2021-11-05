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
    address: '0xA9023D467D8CB02E62865583b0f1dBCe8f2F580B',
    isActive: true,
    name: 'MAXIMUS (MAXI)',
    poolBasic: {
      saleAmount: '10 MAXI',
      raiseAmount: '$120,000',
      lydToBurn: '$60,000',
      distributionRatio: 0.5,
    },
    poolUnlimited: {
      saleAmount: '10 MAXI',
      raiseAmount: '$280,000',
      lydToBurn: '$140,000',
      distributionRatio: 0.5,
    },
    currency: lydAvaxLPToken,
    token: tokens.evrt,
    releaseTimestamp: 7707736,
    campaignId: '511110001',
    articleUrl: 'https://lydiafinance.medium.com/everest-dao-ifo-on-lydia-finance-6bf983a5c9ad',
    tokenOfferingPrice: 0.02,
    version: 2,
    releasePercent: [20, 30, 100],
  },
]

export default ifos
