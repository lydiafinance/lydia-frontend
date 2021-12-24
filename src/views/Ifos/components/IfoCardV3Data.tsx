import React from 'react'
import useGetPublicIfoV3Data from 'hooks/ifo/v3/useGetPublicIfoData'
import useGetWalletIfoV3Data from 'hooks/ifo/v3/useGetWalletIfoData'
import { Ifo } from 'config/constants/types'
import IfoFoldableV3Card from './IfoFoldableV3Card'

interface Props {
  ifo: Ifo
  isInitiallyVisible: boolean
}

const IfoCardV3Data: React.FC<Props> = ({ ifo, isInitiallyVisible }) => {
  const publicIfoData = useGetPublicIfoV3Data(ifo)
  const walletIfoData = useGetWalletIfoV3Data(ifo)

  return (
    <IfoFoldableV3Card
      ifo={ifo}
      publicIfoData={publicIfoData}
      walletIfoData={walletIfoData}
      isInitiallyVisible={isInitiallyVisible}
    />
  )
}

export default IfoCardV3Data
