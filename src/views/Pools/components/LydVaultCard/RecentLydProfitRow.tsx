import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import RecentLydProfitBalance from './RecentLydProfitBalance'

interface RecentLydProfitRowProps {
  lydAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentLydProfitCountdownRow: React.FC<RecentLydProfitRowProps> = ({
  lydAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const shouldDisplayLydProfit =
    account && lydAtLastUserAction && lydAtLastUserAction.gt(0) && userShares && userShares.gt(0)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{t('Recent LYD profit:')}</Text>
      {shouldDisplayLydProfit && (
        <RecentLydProfitBalance
          lydAtLastUserAction={lydAtLastUserAction}
          userShares={userShares}
          pricePerFullShare={pricePerFullShare}
        />
      )}
    </Flex>
  )
}

export default RecentLydProfitCountdownRow
