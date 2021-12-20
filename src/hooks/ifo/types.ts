import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus, PoolIds } from 'config/constants/types'

// PoolCharacteristics retrieved from the contract
export interface PoolCharacteristics {
  raisingAmountPool: BigNumber
  offeringAmountPool: BigNumber
  limitPerUserInLP: BigNumber
  taxRate: number
  totalAmountPool: BigNumber
  sumTaxesOverflow: BigNumber
}

// IFO data unrelated to the user returned by useGetPublicIfoData
export interface PublicIfoData {
  status: IfoStatus
  timestampRemaining: number
  secondsUntilStart: number
  progress: number
  secondsUntilEnd: number
  startTimestampNum: number
  endTimestampNum: number
  currencyPriceInUSD: any
  fetchIfoData: () => void
  [PoolIds.poolBasic]?: PoolCharacteristics
  [PoolIds.poolUnlimited]: PoolCharacteristics
  nextReleaseTimestamp: number
  releasedPercent: BigNumber
}

// User specific pool characteristics
export interface UserPoolCharacteristics {
  amountTokenCommittedInLP: BigNumber // @contract: amountPool
  offeringAmountInToken: BigNumber // @contract: userOfferingAmountPool
  refundingAmountInLP: BigNumber // @contract: userRefundingAmountPool
  taxAmountInLP: BigNumber // @contract: userTaxAmountPool
  hasClaimed: boolean // @contract: claimedPool
  isPendingTx: boolean
  purchasedTokens: BigNumber
  claimedTokens: BigNumber
  claimableTokens: BigNumber
  isEligible?: boolean // @contract: isEligible
  userVaultBalance?: BigNumber
}

// Use only inside the useGetWalletIfoData hook
export interface WalletIfoState {
  [PoolIds.poolBasic]?: UserPoolCharacteristics
  [PoolIds.poolUnlimited]: UserPoolCharacteristics
}

// Returned by useGetWalletIfoData
export interface WalletIfoData extends WalletIfoState {
  allowance: BigNumber
  contract: Contract
  setPendingTx: (status: boolean, poolId: PoolIds) => void
  setIsClaimed: (poolId: PoolIds) => void
  fetchIfoData: () => void
}
