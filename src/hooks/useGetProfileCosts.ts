import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberLydToReactivate: new BigNumber(0),
    numberLydToRegister: new BigNumber(0),
    numberLydToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberLydToReactivate, numberLydToRegister, numberLydToUpdate] = await makeBatchRequest([
          profileContract.methods.numberLydToReactivate().call,
          profileContract.methods.numberLydToRegister().call,
          profileContract.methods.numberLydToUpdate().call,
        ])

        setCosts({
          numberLydToReactivate: new BigNumber(numberLydToReactivate as string),
          numberLydToRegister: new BigNumber(numberLydToRegister as string),
          numberLydToUpdate: new BigNumber(numberLydToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve LYD costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
