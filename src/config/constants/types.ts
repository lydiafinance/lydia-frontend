import { ChainId } from '@lydiafinance/sdk'
import { TranslatableText } from 'state/types'

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  lydToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  tokenSymbol: string
  releaseBlockNumber: number
  campaignId?: string
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
