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
    address: '0x0418546141583845F0c70DCd113b4f58Ea4CD57B',
    isActive: true,
    name: 'TEST (FTT)',
    poolBasic: {
      saleAmount: '30 FTT',
      raiseAmount: '$3',
      lydToBurn: '$1.5',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '70 FTT',
      raiseAmount: '$7',
      lydToBurn: '$3.5',
      distributionRatio: 0.7,
    },
    currency: lydAvaxLPToken,
    token: tokens.test,
    releaseTimestamp: 7707736,
    campaignId: '511110000',
    articleUrl: 'https://lydiafinance.medium.com/everest-dao-ifo-on-lydia-finance-6bf983a5c9ad',
    tokenOfferingPrice: 0.02,
    version: 2,
  },
]

export default ifos
