import React from 'react'
import { Flex, Text, TooltipText, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

interface UnstakingFeeCountdownRowProps {
  withdrawalFee: string
  lastDepositedTime: string
  withdrawalFeePeriod?: string
}

const UnstakingFeeCountdownRow: React.FC<UnstakingFeeCountdownRowProps> = ({
  withdrawalFee,
}) => {
  const { t } = useTranslation()
  const feeAsDecimal = parseInt(withdrawalFee) / 100 || '-'
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        {t(`Unstaking fee: %fee%%`, { fee: feeAsDecimal })}
      </Text>
    </>,
    { placement: 'bottom-start' },
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        {feeAsDecimal}% {t('unstaking fee')}
      </TooltipText>
    </Flex>
  )
}

export default UnstakingFeeCountdownRow
