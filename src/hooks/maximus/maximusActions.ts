import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchMaximusUserDataAsync } from 'state/actions'
import { maximusClaimReward } from 'utils/callHelpers'
import { useMaximusContact, useMaximusDashboardContract } from '../useContract'

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

export const useCompoundingApy = (farmApr: string, poolApr: string, compound: number) => {
  const maximusDashboardContract = useMaximusDashboardContract()
  const [compoundingApy, setCompoundingApy] = useState(0)

  useEffect(() => {
    const getCompoundingApy = async () => {
      if (farmApr !== '0' && poolApr !== '0') {
        const apy = await maximusDashboardContract.methods.compoundingAPY(farmApr, poolApr, compound).call()

        setCompoundingApy(apy / 1e16)
      }
    }

    getCompoundingApy()
  }, [compound, farmApr, maximusDashboardContract, poolApr])

  return compoundingApy
}
