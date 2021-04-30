import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@lydiafinance/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  lydPrice?: BigNumber
  apy?: number
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, lydPrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} lydPrice={lydPrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButton
