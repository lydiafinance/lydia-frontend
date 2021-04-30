import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/pools'
import masterChefABI from 'config/abi/masterchef.json'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { getWeb3NoAccount } from 'utils/web3'
import BigNumber from 'bignumber.js'

// Pool 0, LYD / LYD is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const nonAvaxPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'AVAX')
const avaxPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'AVAX')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const web3 = getWeb3NoAccount()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddress())

export const fetchPoolsAllowance = async (account) => {
  const calls = nonAvaxPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonAvaxPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non AVAX pools
  const calls = nonAvaxPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonAvaxPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // AVAX pools
  const avaxBalance = await web3.eth.getBalance(account)
  const avaxBalances = avaxPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(avaxBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...avaxBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // LYD / LYD pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // LYD / LYD pool
  const pendingReward = await masterChefContract.methods.pendingLyd('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
