import React from 'react'
import BigNumber from 'bignumber.js'
import { TooltipText, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

interface RecentLydProfitBalanceProps {
  pendingReward: BigNumber
}

const RecentLydProfitBalance: React.FC<RecentLydProfitBalanceProps> = ({ pendingReward }) => {
  const lydToDisplay = pendingReward.gte(0) ? pendingReward.toNumber().toFixed(5) : '0'

  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Your estimated earnings since last manual stake or unstake:'),
    { placement: 'bottom-end' },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        {lydToDisplay}
      </TooltipText>
    </>
  )
}

export default RecentLydProfitBalance
