import React from 'react'
import { Ifo } from 'config/constants/types'
import useGetPublicIfoV1Data from 'hooks/ifo/v1/useGetPublicIfoData'
import useGetWalletIfoV1Data from 'hooks/ifo/v1/useGetWalletIfoData'
import IfoFoldableCard from './IfoFoldableCard'

interface Props {
  ifo: Ifo
  isInitiallyVisible: boolean
}

const IfoCardV1Data: React.FC<Props> = ({ ifo, isInitiallyVisible }) => {
  const publicIfoData = useGetPublicIfoV1Data(ifo)
  const walletIfoData = useGetWalletIfoV1Data(ifo)

  return (
    <IfoFoldableCard
      ifo={ifo}
      publicIfoData={publicIfoData}
      walletIfoData={walletIfoData}
      isInitiallyVisible={isInitiallyVisible}
    />
  )
}

export default IfoCardV1Data
