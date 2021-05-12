import React from 'react'
import { Heading, Card, CardBody } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import HistoryChart from './HistoryChart'
import Legend from './Legend'

const PastDrawsHistoryCard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardBody>
        <Heading size="md">{t('History')}</Heading>
        <Legend />
        <HistoryChart />
      </CardBody>
    </Card>
  )
}

export default PastDrawsHistoryCard
