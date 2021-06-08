import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import RecentLydProfitBalance from './RecentLydProfitBalance'

interface RecentLydProfitRowProps {
  pendingReward: BigNumber
}

const RecentLydProfitCountdownRow: React.FC<RecentLydProfitRowProps> = ({ pendingReward }) => {
  const { t } = useTranslation()
  const shouldDisplayLydProfit = pendingReward && pendingReward.gt(0)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{t('Recent LYD profit:')}</Text>
      {shouldDisplayLydProfit && <RecentLydProfitBalance pendingReward={pendingReward} />}
    </Flex>
  )
}

export default RecentLydProfitCountdownRow
