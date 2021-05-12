import React from 'react'
import BigNumber from 'bignumber.js'
import { Text } from '@lydiafinance/uikit'
import { UserInfo } from 'hooks/useGetWalletIfoData'
import { useTranslation } from 'contexts/Localization'

interface PercentageOfTotalProps {
  userAmount: UserInfo['amount']
  totalAmount: BigNumber
}

const PercentageOfTotal: React.FC<PercentageOfTotalProps> = ({ userAmount, totalAmount }) => {
  const { t } = useTranslation()
  const percentOfUserContribution = userAmount.div(totalAmount).times(100).toNumber()
  const percentOfUserDisplay = percentOfUserContribution.toLocaleString(undefined, { maximumFractionDigits: 5 })

  return (
    <Text fontSize="14px" color="textSubtle">
      {t(`${percentOfUserDisplay}% of total`, { num: percentOfUserDisplay })}
    </Text>
  )
}

export default PercentageOfTotal
