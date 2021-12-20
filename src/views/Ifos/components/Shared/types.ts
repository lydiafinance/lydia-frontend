import { PublicIfoData, WalletIfoData } from 'hooks/ifo/types'
import { Ifo } from 'config/constants/types'

export enum EnableStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  IS_ENABLING = 'is_enabling',
}

export interface IfoFoldableCardProps {
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  isInitiallyVisible: boolean
}

export default EnableStatus
