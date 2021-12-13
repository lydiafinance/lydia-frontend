import { useEffect, useState } from 'react'
import { useLydGovernanceContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

export interface GovernanceFees {
  performanceFee: string
  callFee: string
  withdrawalFee: string
  withdrawalFeePeriod: string
}

const useGetGovernanceFees = () => {
  const lydGovernanceContract = useLydGovernanceContract()
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
        lydGovernanceContract.methods.performanceFee().call,
        lydGovernanceContract.methods.withdrawFeePeriod().call,
        lydGovernanceContract.methods.callFee().call,
        lydGovernanceContract.methods.withdrawFee().call,
      ])

      setFees({
        performanceFee: contractPerformanceFee as string,
        callFee: contractCallFee as string,
        withdrawalFee: contractWithdrawalFee as string,
        withdrawalFeePeriod: contractWithdrawalFeeTimePeriod as string,
      })
    }

    getFees()
  }, [lydGovernanceContract])

  return fees
}

export default useGetGovernanceFees
