import { ChainId } from '@lydiafinance/sdk'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = ChainId.AVALANCHE
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getLydAddress = () => {
  return getAddress(tokens.lyd.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWavaxAddress = () => {
  return getAddress(tokens.wavax.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getLydiaProfileAddress = () => {
  return getAddress(addresses.lydiaProfile)
}
export const getLydiaLionsAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getAirdropAddress = () => {
  return getAddress(addresses.airdrop)
}
export const getLydVaultAddress = () => {
  return getAddress(addresses.lydVault)
}
