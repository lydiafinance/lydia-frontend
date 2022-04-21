import React from 'react'
import { useTranslation } from 'contexts/Localization'
import useGetAvaxLionsNfts from 'hooks/useGetAvaxLionsNfts'
import NftListView from './NftListView'

const NftStakeListView = () => {
  const { t } = useTranslation()

  const { nfts, isLoading, refresh } = useGetAvaxLionsNfts()

  return (
    <NftListView
      title={t('Available NFTs')}
      buttonText={t('Stake NFTs')}
      emptyText={t('You do not have avax lions')}
      nfts={nfts}
      isLoading={isLoading}
      refresh={refresh}
    />
  )
}

export default NftStakeListView
