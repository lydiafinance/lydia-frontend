import { useEffect, useState } from 'react'
import { useLydVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

export interface VaultFees {
  performanceFee: string
  callFee: string
  withdrawalFee: string
  withdrawalFeePeriod: string
}

const useGetVaultFees = () => {
  const lydVaultContract = useLydVaultContract()
  const [fees, setFees] = useState({
    performanceFee: null,
    callFee: null,
    withdrawalFee: null,
    withdrawalFeePeriod: null,
  })

  useEffect(() => {
    const getFees = async () => {
      const [
        contractPerformanceFee,
        contractWithdrawalFeeTimePeriod,
        contractCallFee,
        contractWithdrawalFee,
      ] = await makeBatchRequest([
        lydVaultContract.methods.performanceFee().call,
        lydVaultContract.methods.withdrawFeePeriod().call,
        lydVaultContract.methods.callFee().call,
        lydVaultContract.methods.withdrawFee().call,
      ])

      setFees({
        performanceFee: contractPerformanceFee as string,
        callFee: contractCallFee as string,
        withdrawalFee: contractWithdrawalFee as string,
        withdrawalFeePeriod: contractWithdrawalFeeTimePeriod as string,
      })
    }

    getFees()
  }, [lydVaultContract])

  return fees
}

export default useGetVaultFees
