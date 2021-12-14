import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip, Box } from '@lydiafinance/uikit'
import { Pool } from 'state/types'
import { CompoundingPoolTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface GovernanceFooterProps {
  pool: Pool
  account: string
  performanceFee?: number
  totalLydInGovernance?: BigNumber
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`

const GovernanceCardFooter: React.FC<GovernanceFooterProps> = ({ pool, account, performanceFee = 0, totalLydInGovernance }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(autoTooltipText, {
    placement: 'bottom-end',
  })

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <Flex alignItems="center">
          <CompoundingPoolTag />
          {tooltipVisible && tooltip}
          <Box ref={targetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
          </Box>
        </Flex>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && (
        <ExpandedFooter
          pool={pool}
          account={account}
          performanceFee={performanceFee}
          totalLydInGovernance={totalLydInGovernance}
        />
      )}
    </CardFooter>
  )
}

export default GovernanceCardFooter
