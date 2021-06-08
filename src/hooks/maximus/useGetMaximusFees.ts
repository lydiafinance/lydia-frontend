import { useEffect, useState } from 'react'
import { useMaximusFeeManagerContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

export interface VaultFees {
  performanceFee: string
  withdrawalFee: string
  withdrawalFeePeriod: string
}

const useGetVaultFees = () => {
  const maximusFeeManagerContract = useMaximusFeeManagerContract()
  const [fees, setFees] = useState({
    performanceFee: null,
    withdrawalFee: null,
    withdrawalFeePeriod: null,
  })

  useEffect(() => {
    const getFees = async () => {
      const [contractPerformanceFee, contractWithdrawalFeeTimePeriod, contractWithdrawalFee] = await makeBatchRequest([
        maximusFeeManagerContract.methods.PERFORMANCE_FEE().call,
        maximusFeeManagerContract.methods.WITHDRAWAL_FEE_FREE_PERIOD().call,
        maximusFeeManagerContract.methods.WITHDRAWAL_FEE().call,
      ])

      setFees({
        performanceFee: contractPerformanceFee as string,
        withdrawalFee: contractWithdrawalFee as string,
        withdrawalFeePeriod: contractWithdrawalFeeTimePeriod as string,
      })
    }

    getFees()
  }, [maximusFeeManagerContract])

  return fees
}

export default useGetVaultFees
