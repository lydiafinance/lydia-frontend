import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { convertSharesToLyd } from 'views/Pools/helpers'
import { useLydVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetVaultSharesInfo = (lastUpdated?: number) => {
  const lydVaultContract = useLydVaultContract()
  const [totalShares, setTotalShares] = useState(null)
  const [totalLydInVault, setTotalLydInVault] = useState(null)
  const [pricePerFullShare, setPricePerFullShare] = useState(null)

  useEffect(() => {
    const getTotalShares = async () => {
      const [sharePrice, shares] = await makeBatchRequest([
        lydVaultContract.methods.getPricePerFullShare().call,
        lydVaultContract.methods.totalShares().call,
      ])
      const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
      const totalSharesAsBigNumber = new BigNumber(shares as string)
      const totalLydInVaultEstimate = convertSharesToLyd(totalSharesAsBigNumber, sharePriceAsBigNumber)
      setPricePerFullShare(sharePriceAsBigNumber)
      setTotalShares(totalSharesAsBigNumber)
      setTotalLydInVault(totalLydInVaultEstimate.lydAsBigNumber)
    }
    getTotalShares()
  }, [lydVaultContract, lastUpdated])

  return { totalShares, totalLydInVault, pricePerFullShare }
}

export default useGetVaultSharesInfo
