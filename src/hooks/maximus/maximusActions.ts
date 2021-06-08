import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchMaximusUserDataAsync } from 'state/actions'
import { maximusClaimReward } from 'utils/callHelpers'
import { useMaximusContact } from '../useContract'

export const useClaimReward = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const maximusContract = useMaximusContact(farmPid)

  const handleClaimReward = useCallback(async () => {
    const txHash = await maximusClaimReward(maximusContract, account)
    dispatch(fetchMaximusUserDataAsync(account))
    return txHash
  }, [account, dispatch, maximusContract])

  return { onReward: handleClaimReward }
}

export const useUnstake = () => {
  return null
}
