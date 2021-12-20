import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Ifo, PoolIds } from 'config/constants/types'
import { useERC20, useIfoV3Contract } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import useRefresh from 'hooks/useRefresh'
import multicall from 'utils/multicall'
import ifoV3Abi from 'config/abi/ifoV3.json'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { WalletIfoState, WalletIfoData } from '../types'

/**
 * Gets all data from an IFO related to a wallet
 */
const useGetWalletIfoData = (ifo: Ifo): WalletIfoData => {
  const { fastRefresh } = useRefresh()
  const [state, setState] = useState<WalletIfoState>({
    poolBasic: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      taxAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
      purchasedTokens: BIG_ZERO,
      claimedTokens: BIG_ZERO,
      claimableTokens: BIG_ZERO,
      isEligible: false,
      userVaultBalance: BIG_ZERO
    },
    poolUnlimited: {
      amountTokenCommittedInLP: BIG_ZERO,
      offeringAmountInToken: BIG_ZERO,
      refundingAmountInLP: BIG_ZERO,
      taxAmountInLP: BIG_ZERO,
      hasClaimed: false,
      isPendingTx: false,
      purchasedTokens: BIG_ZERO,
      claimedTokens: BIG_ZERO,
      claimableTokens: BIG_ZERO,
      isEligible: false,
      userVaultBalance: BIG_ZERO
    },
  })

  const { address, currency } = ifo

  const { account } = useWeb3React()
  const contract = useIfoV3Contract(address)
  const currencyContract = useERC20(getAddress(currency.address))
  const allowance = useIfoAllowance(currencyContract, address)

  const setPendingTx = (status: boolean, poolId: PoolIds) =>
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        isPendingTx: status,
      },
    }))

  const setIsClaimed = (poolId: PoolIds) => {
    setState((prevState) => ({
      ...prevState,
      [poolId]: {
        ...prevState[poolId],
        hasClaimed: true,
      },
    }))
  }

  // uint256 amountPool; // How many tokens the user has provided for pool
  // bool claimedPool; // Whether the user has claimed (default: false) for pool
  // uint256 purchasedTokens; // Total purchased offering tokens amount by the user
  // uint256 claimedTokens; // Total claimed offering tokens amount by the user

  const fetchIfoData = useCallback(async () => {
    const ifoCalls = [
      {
        address,
        name: 'viewUserInfo',
        params: [account, [0, 1]],
      },
      {
        address,
        name: 'viewUserOfferingAndRefundingAmountsForPools',
        params: [account, [0, 1]],
      },
      {
        address,
        name: 'claimableTokens',
        params: [account, [0, 1]],
      },
      {
        address,
        name: 'isEligible',
        params: [account],
      },
      {
        address,
        name: 'viewUserVaultBalance',
        params: [account],
      }
    ]

    const [userInfo, amounts, claimableTokens, isEligible, viewUserVaultBalance] = await multicall(ifoV3Abi, ifoCalls)

    setState((prevState) => ({
      ...prevState,
      poolBasic: {
        ...prevState.poolBasic,
        amountTokenCommittedInLP: new BigNumber(userInfo[0][0].toString()),
        offeringAmountInToken: new BigNumber(amounts[0][0][0].toString()),
        refundingAmountInLP: new BigNumber(amounts[0][0][1].toString()),
        taxAmountInLP: new BigNumber(amounts[0][0][2].toString()),
        hasClaimed: userInfo[1][0],
        purchasedTokens: new BigNumber(userInfo[2][0].toString()),
        claimedTokens: new BigNumber(userInfo[3][0].toString()),
        claimableTokens: new BigNumber(claimableTokens[0][0].toString()),
        isEligible: isEligible[0],
        userVaultBalance: new BigNumber(viewUserVaultBalance[0])
      },
      poolUnlimited: {
        ...prevState.poolUnlimited,
        amountTokenCommittedInLP: new BigNumber(userInfo[0][1].toString()),
        offeringAmountInToken: new BigNumber(amounts[0][1][0].toString()),
        refundingAmountInLP: new BigNumber(amounts[0][1][1].toString()),
        taxAmountInLP: new BigNumber(amounts[0][1][2].toString()),
        hasClaimed: userInfo[1][1],
        purchasedTokens: new BigNumber(userInfo[2][1].toString()),
        claimedTokens: new BigNumber(userInfo[3][1].toString()),
        claimableTokens: new BigNumber(claimableTokens[0][1].toString()),
        isEligible: isEligible[0],
        userVaultBalance: new BigNumber(viewUserVaultBalance[0])
      },
    }))
  }, [account, address])

  useEffect(() => {
    if (account) {
      fetchIfoData()
    }
  }, [account, fetchIfoData, fastRefresh])

  return { ...state, allowance, contract, setPendingTx, setIsClaimed, fetchIfoData }
}

export default useGetWalletIfoData
