import React from 'react'
import PageHeader from 'components/PageHeader'
import { Image, Heading, RowType, Toggle, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

const Bridge = () => {
  const { t } = useTranslation()

  return (
    <PageHeader>
      <Heading as="h1" size="xxl" color="secondary" mb="24px">
        {t('LYD Gate ')}
      </Heading>
      <Heading size="lg" color="text">
        {t('Simple & Fast BSC to LYD Bridge')}
      </Heading>
    </PageHeader>
  )
}

export default Bridge
