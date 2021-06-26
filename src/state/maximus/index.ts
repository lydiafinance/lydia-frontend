/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/maximus'
import fetchMaximusFarms from './fetchMaximusFarms'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchUserDepositAt,
} from './fetchMaximusFarmsUser'
import { MaximusState, Maximus } from '../types'

const initialState: MaximusState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setMaximusFarmsPublicData: (state, action) => {
      const livePoolsData: Maximus[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.pid === pool.pid)
        return { ...pool, ...livePoolData }
      })
    },
    setMaximusFarmsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.pid === pool.pid)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setMaximusFarmsPublicData, setMaximusFarmsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchMaximusPublicDataAsync = () => async (dispatch) => {
  const maximusPublicData = await fetchMaximusFarms()

  const liveData = poolsConfig.map((pool) => {
    const publicData = maximusPublicData.find((entry) => entry.pid === pool.pid)
    return {
      ...publicData,
    }
  })

  dispatch(setMaximusFarmsPublicData(liveData))
}

export const fetchMaximusUserDataAsync = (account) => async (dispatch) => {
  const calls = [
    fetchPoolsAllowance(account),
    fetchUserBalances(account),
    fetchUserStakeBalances(account),
    fetchUserPendingRewards(account),
    fetchUserDepositAt(account),
  ]

  const [allowance, stakingTokenBalance, stakedBalance, pendingReward, depositAt] = await Promise.all(calls)

  const userData = poolsConfig.map((pool) => ({
    pid: pool.pid,
    allowance: allowance[pool.pid],
    stakingTokenBalance: stakingTokenBalance[pool.pid],
    stakedBalance: stakedBalance[pool.pid],
    pendingReward: pendingReward[pool.pid],
    depositAt: depositAt[pool.pid],
  }))

  dispatch(setMaximusFarmsUserData(userData))
}

export const updateUserAllowance = (pid: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ pid, field: 'allowance', value: allowances[pid] }))
}

export const updateUserBalance = (pid: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ pid, field: 'stakingTokenBalance', value: tokenBalances[pid] }))
}

export const updateUserStakedBalance = (pid: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ pid, field: 'stakedBalance', value: stakedBalances[pid] }))
}

export const updateUserPendingReward = (pid: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ pid, field: 'pendingReward', value: pendingRewards[pid] }))
}

export default PoolsSlice.reducer
