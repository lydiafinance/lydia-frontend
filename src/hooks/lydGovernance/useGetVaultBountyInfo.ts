import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useGetApiPrice } from 'state/hooks'
import { useLydGovernanceContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetVaultBountyInfo = () => {
  const { fastRefresh } = useRefresh()
  const lydGovernanceContract = useLydGovernanceContract()
  const [estimatedDollarBountyReward, setEstimatedDollarBountyReward] = useState(null)
  const [estimatedLydBountyReward, setEstimatedLydBountyReward] = useState(null)
  const [totalPendingLydHarvest, setTotalPendingLydHarvest] = useState(null)

  const lydPrice = useGetApiPrice('lyd')

  useEffect(() => {
    const fetchRewards = async () => {
      const [estimatedClaimableLydReward, pendingTotalLydHarvest] = await makeBatchRequest([
        lydGovernanceContract?.methods?.calculateHarvestLydRewards().call,
        lydGovernanceContract?.methods?.calculateHarvestLydRewards().call,
      ])
      if (lydPrice) {
        const dollarValueOfClaimableReward = new BigNumber(estimatedClaimableLydReward as string).multipliedBy(lydPrice)
        setEstimatedDollarBountyReward(dollarValueOfClaimableReward)
      }
      setEstimatedLydBountyReward(new BigNumber(estimatedClaimableLydReward as string))
      setTotalPendingLydHarvest(new BigNumber(pendingTotalLydHarvest as string))
    }
    fetchRewards()
  }, [lydGovernanceContract, lydPrice, fastRefresh])

  return { estimatedLydBountyReward, estimatedDollarBountyReward, totalPendingLydHarvest }
}

export default useGetVaultBountyInfo
