import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useLydVaultContract } from 'hooks/useContract'

const useGetVaultUserInfo = (lastUpdated?: number) => {
  const { account } = useWeb3React()
  const lydVaultContract = useLydVaultContract()
  const [userInfo, setUserInfo] = useState({
    shares: BIG_ZERO,
    lydAtLastUserAction: BIG_ZERO,
    lastDepositedTime: '',
    lastUserActionTime: '',
  })

  useEffect(() => {
    //   user-specific vault contract fetches
    const fetchUserVaultInfo = async () => {
      const userContractInfo = await lydVaultContract.methods.userInfo(account).call()
      setUserInfo({
        shares: new BigNumber(userContractInfo.shares),
        lydAtLastUserAction: new BigNumber(userContractInfo.lydAtLastUserAction),
        lastDepositedTime: userContractInfo.lastDepositedTime,
        lastUserActionTime: userContractInfo.lastUserActionTime,
      })
    }

    if (account) {
      fetchUserVaultInfo()
    }
  }, [account, lydVaultContract, lastUpdated])

  return userInfo
}

export default useGetVaultUserInfo
