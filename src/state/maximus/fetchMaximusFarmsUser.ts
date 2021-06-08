import BigNumber from 'bignumber.js'

import poolsConfig from 'config/constants/maximus'
import maximusAbi from 'config/abi/maximusAbi.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { getLydVaultContract } from 'utils/contractHelpers'
import { getWeb3NoAccount } from 'utils/web3'
import { BIG_TEN } from 'utils/bigNumber'

// Pool 0, LYD / LYD is a different kind of contract (master chef)
// AVAX pools use the native AVAX token (wrapping ? unwrapping is done at the contract level)
const nonAvaxPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'AVAX')
const avaxPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'AVAX')
const web3 = getWeb3NoAccount()
const lydVaultContract = getLydVaultContract(web3)

export const fetchPoolsAllowance = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.pid]: new BigNumber(allowances[index]).toJSON() }),
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
    (acc, pool, index) => ({ ...acc, [pool.pid]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // AVAX pools
  const avaxBalance = await web3.eth.getBalance(account)
  const avaxBalances = avaxPools.reduce(
    (acc, pool) => ({ ...acc, [pool.pid]: new BigNumber(avaxBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...avaxBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'balanceOf',
    params: [account],
  }))
  const balances = await multicall(maximusAbi, calls)
  const stakedBalances = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.pid]: new BigNumber(balances[index]),
    }),
    {},
  )

  return { ...stakedBalances }
}

export const fetchUserDepositAt = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'depositedAt',
    params: [account],
  }))
  const depositAt = await multicall(maximusAbi, calls)
  const depositTimes = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.pid]: new BigNumber(depositAt[index]).toJSON(),
    }),
    {},
  )

  return { ...depositTimes }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'earned',
    params: [account],
  }))
  const res = await multicall(maximusAbi, calls)
  const priceShare = await lydVaultContract.methods.getPricePerFullShare().call()

  const pendingRewards = poolsConfig.reduce((acc, pool, index) => {
    const _priceShare = new BigNumber(priceShare).dividedBy(BIG_TEN.pow(18))
    const _earned = new BigNumber(new BigNumber(res[index]).toJSON()).dividedBy(BIG_TEN.pow(18))

    return {
      ...acc,
      [pool.pid]: _earned.multipliedBy(_priceShare),
    }
  }, {})

  return { ...pendingRewards }
}
