import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { convertSharesToLyd } from 'views/Pools/helpers'
import { useLydGovernanceContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetGovernanceSharesInfo = (lastUpdated?: number) => {
  const lydVaultContract = useLydGovernanceContract()
  const [totalShares, setTotalShares] = useState(null)
  const [totalLydInGovernance, setTotalLydInGovernance] = useState(null)
  const [pricePerFullShare, setPricePerFullShare] = useState(null)

  useEffect(() => {
    const getTotalShares = async () => {
      const [sharePrice, shares] = await makeBatchRequest([
        lydVaultContract.methods.getPricePerFullShare().call,
        lydVaultContract.methods.totalShares().call,
      ])
      const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
      const totalSharesAsBigNumber = new BigNumber(shares as string)
      const totalLydInGovernanceEstimate = convertSharesToLyd(totalSharesAsBigNumber, sharePriceAsBigNumber)
      setPricePerFullShare(sharePriceAsBigNumber)
      setTotalShares(totalSharesAsBigNumber)
      setTotalLydInGovernance(totalLydInGovernanceEstimate.lydAsBigNumber)
    }
    getTotalShares()
  }, [lydVaultContract, lastUpdated])

  return { totalShares, totalLydInGovernance, pricePerFullShare }
}

export default useGetGovernanceSharesInfo
