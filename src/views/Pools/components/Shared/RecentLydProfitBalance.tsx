import React from 'react'
import BigNumber from 'bignumber.js'
import { TooltipText, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { convertSharesToLyd } from '../../helpers'

interface RecentLydProfitBalanceProps {
  lydAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentLydProfitBalance: React.FC<RecentLydProfitBalanceProps> = ({
  lydAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const currentSharesAsLyd = convertSharesToLyd(userShares, pricePerFullShare)
  const lydProfit = currentSharesAsLyd.lydAsBigNumber.minus(lydAtLastUserAction)
  const lydToDisplay = lydProfit.gte(0) ? getFullDisplayBalance(lydProfit, 18, 5) : '0'

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
