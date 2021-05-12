import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getLydiaProfileAddress,
  getLydiaLionsAddress,
  getBunnyFactoryAddress,
  getLydAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getAirdropAddress,
  getLydVaultAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/lydiaProfile.json'
import lydiaLionsAbi from 'config/abi/lydiaLions.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import lydAbi from 'config/abi/lyd.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefAvax from 'config/abi/sousChefAvax.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import airDropAbi from 'config/abi/airdrop.json'
import lydVaultAbi from 'config/abi/lydVaultAbi.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.AVALANCHE ? sousChefAvax : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getLydContract = (web3?: Web3) => {
  return getContract(lydAbi, getLydAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getLydiaProfileAddress(), web3)
}
export const getLydiaRabbitContract = (web3?: Web3) => {
  return getContract(lydiaLionsAbi, getLydiaLionsAddress(), web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getAirdropContract = (web3?: Web3) => {
  return getContract(airDropAbi, getAirdropAddress(), web3)
}
export const getLydVaultContract = (web3?: Web3) => {
  return getContract(lydVaultAbi, getLydVaultAddress(), web3)
}
