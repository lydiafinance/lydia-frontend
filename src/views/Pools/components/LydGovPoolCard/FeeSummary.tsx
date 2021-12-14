import React from 'react'
import { Text, Flex, useTooltip, TooltipText } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { VaultFees } from 'hooks/lydVault/useGetVaultFees'
import { GovernanceFees } from 'hooks/lydGovernance/useGetGovernanceFees'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

interface FeeSummaryProps {
  stakingTokenSymbol: string
  lastDepositedTime: string
  governanceFees: GovernanceFees
  stakeAmount: string
}

const FeeSummary: React.FC<FeeSummaryProps> = ({ stakingTokenSymbol, lastDepositedTime, governanceFees, stakeAmount }) => {
  const { t } = useTranslation()
  const feeAsDecimal = parseInt(governanceFees.withdrawalFee) / 100
  const feeInLyd = (parseFloat(stakeAmount) * (feeAsDecimal / 100)).toFixed(4)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        {t(`Unstaking fee: %fee%%`, { fee: feeAsDecimal })}
      </Text>
      <Text>
        {t(
          'Only applies within 5 days of staking. Unstaking after 5 days will not include a fee. Timer resets every time you stake new LYD in the pool.',
        )}
      </Text>
    </>,
    { placement: 'top-start' },
  )

  return (
    <>
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef} small>
          {t('Unstaking Fee')}
        </TooltipText>
        <Text fontSize="14px">
          {stakeAmount ? feeInLyd : '-'} {stakingTokenSymbol}
        </Text>
      </Flex>
      <UnstakingFeeCountdownRow
        withdrawalFee={governanceFees.withdrawalFee}
        withdrawalFeePeriod={governanceFees.withdrawalFeePeriod}
        lastDepositedTime={lastDepositedTime}
      />
    </>
  )
}

export default FeeSummary
