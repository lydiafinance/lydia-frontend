import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, HelpIcon, useTooltip, Box } from '@lydiafinance/uikit'

import { useTranslation } from 'contexts/Localization'
import { useClaimReward } from 'hooks/maximus/maximusActions'
import { useWeb3React } from '@web3-react/core'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useClaimReward(pid)

  const rawEarningsBalance = account && earnings ? earnings.toNumber().toFixed(5) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Your estimated earnings since last manual stake or unstake:'),
    { placement: 'bottom-end' },
  )

  const _harvestOnClick = () => {
    setPendingTx(true)
    onReward().finally(() => {
      setPendingTx(false)
    })
  }

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Box ref={targetRef}>
        <Flex alignItems="center">
          <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
          <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
        </Flex>
      </Box>
      {tooltipVisible && tooltip}
      <Button disabled={rawEarningsBalance === 0 || pendingTx} onClick={_harvestOnClick}>
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
