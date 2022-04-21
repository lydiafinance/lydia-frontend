import React from 'react'
import { useTranslation } from 'contexts/Localization'
import useGetAvaxLionsStakedNfts from 'hooks/useGetAvaxLionsStakedNfts'
import NftListView from './NftListView'

const NftWithdrawListView = () => {
  const { t } = useTranslation()

  const { nfts, isLoading, refresh } = useGetAvaxLionsStakedNfts()

  return (
    <NftListView
      title={t('Staked NFTs')}
      buttonText={t('Withdraw NFTs')}
      emptyText={t('You do not have staked avax lions')}
      withdrawMode
      nfts={nfts}
      isLoading={isLoading}
      refresh={refresh}
    />
  )
}

export default NftWithdrawListView
