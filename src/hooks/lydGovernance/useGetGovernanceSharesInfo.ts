import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { convertSharesToLyd } from 'views/Pools/helpers'
import { useLydGovernanceContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetGovernanceSharesInfo = (lastUpdated?: number) => {
  const lydGovernanceContract = useLydGovernanceContract()
  const [totalShares, setTotalShares] = useState(null)
  const [totalLydInGovernance, setTotalLydInGovernance] = useState(null)
  const [pricePerFullShare, setPricePerFullShare] = useState(null)

  useEffect(() => {
    const getTotalShares = async () => {
      const [sharePrice, shares] = await makeBatchRequest([
        lydGovernanceContract.methods.getPricePerFullShare().call,
        lydGovernanceContract.methods.totalShares().call,
      ])
      const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
      const totalSharesAsBigNumber = new BigNumber(shares as string)
      const totalLydInGovernanceEstimate = convertSharesToLyd(totalSharesAsBigNumber, sharePriceAsBigNumber)
      setPricePerFullShare(sharePriceAsBigNumber)
      setTotalShares(totalSharesAsBigNumber)
      setTotalLydInGovernance(totalLydInGovernanceEstimate.lydAsBigNumber)
    }
    getTotalShares()
  }, [lydGovernanceContract, lastUpdated])

  return { totalShares, totalLydInGovernance, pricePerFullShare }
}

export default useGetGovernanceSharesInfo
