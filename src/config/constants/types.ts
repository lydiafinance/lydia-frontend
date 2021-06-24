import { ChainId } from '@lydiafinance/sdk'
import { TranslatableText } from 'state/types'

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export enum QuoteToken {
  'AVAX' = 'AVAX',
  'USDT' = 'USDT',
  'ETH' = 'ETH',
  'WBTC' = 'WBTC',
  'LYD' = 'LYD',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'AVALANCHE' = 'Avalanche', // Pools using native AVAX behave differently than pools using a token
}

export interface Address {
  [ChainId.FUJI]?: string
  [ChainId.AVALANCHE]: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  usdtPrice?: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  lpTokenBalanceMC?: any
  multiplier?: string
  isCommunity?: any
  quoteTokenSymbol?: any
  isTokenOnly?: any
  tokenSymbol?: any
  quoteTokenAdresses?: any
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  lydToBurn: string
  distributionRatio: number // Range [0-1]
}

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  currency: Token
  token: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}
export interface MaximusConfig {
  pid: number
  lpSymbol: string
  contractAddress: Address
  earningToken: Token
  lpTokenBalanceMC?: any
  stakingToken: Address
  isFinished?: boolean
  stakingLimit?: number
  enableEmergencyWithdraw?: boolean
  sortOrder?: number
  harvest?: boolean
  token?: any
  quoteToken?: any
  quoteTokenSymbol?: any
  tokenPerBlock?: any
  lpTotalInQuoteToken?: any
}

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  enableEmergencyWithdraw?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}
