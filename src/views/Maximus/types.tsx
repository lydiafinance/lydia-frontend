import BigNumber from 'bignumber.js'

export interface VaultUser {
  shares: BigNumber
  lydAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}
