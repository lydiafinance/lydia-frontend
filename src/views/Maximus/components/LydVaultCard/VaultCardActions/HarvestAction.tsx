import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Modal, Flex, Heading, Text, HelpIcon, useTooltip, Box, useModal } from '@lydiafinance/uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { useClaimReward } from 'hooks/maximus/maximusActions'
import { useWeb3React } from '@web3-react/core'
import VaultStakeModal from '../VaultStakeModal'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useClaimReward(pid)
  const { theme } = useTheme()

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

  const ButtonWrapper = styled.div``
  const ModalWrapper = styled.div`
    max-width: 500px;
  `

  const Description = styled(Text)`
    color: ${theme.colors.textSubtle};
    font-size: 16px;
    text-align: left;
    margin: 10px 0px;
  `

  const ButtonWrapperMargin = styled.div`
    margin: 10px;
  `
  const ButtonsGroup = styled.div`
    flex-direction: inherit;
    display: flex;
  `

  const [onHarvestRequest, closeOnOverlayClick] = useModal(
    <Modal
      title="Are you sure you want to stop auto-compounding?"
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <ModalWrapper>
        <Description color="contrast" bold={false}>
          Your current profit already compounds automatically every 5 minutes to maximize it.
        </Description>

        <Description color="contrast" bold={false}>
          Are you sure want to stop auto-compounding for current profit and harvest it?
        </Description>

        <ButtonsGroup>
          <ButtonWrapperMargin>
            <Button
              disabled={rawEarningsBalance === 0 || pendingTx}
              onClick={() => closeOnOverlayClick()}
              variant="primary"
            >
              {t('No, keep it auto-compounding')}
            </Button>
          </ButtonWrapperMargin>

          <ButtonWrapperMargin>
            <Button disabled={rawEarningsBalance === 0 || pendingTx} onClick={_harvestOnClick} variant="secondary">
              {t('Yes, harvest my recent profit')}
            </Button>
          </ButtonWrapperMargin>
        </ButtonsGroup>
      </ModalWrapper>
    </Modal>,
  )

  useEffect(() => {
    if (rawEarningsBalance === 0 || pendingTx) {
      closeOnOverlayClick()
    }
  }, [rawEarningsBalance, pendingTx, closeOnOverlayClick])

  // _harvestOnClick

  return (
    <Flex mb="10px" justifyContent="space-between" alignItems="center">
      <Box ref={targetRef}>
        <Flex alignItems="center">
          <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
          <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
        </Flex>
      </Box>
      {tooltipVisible && tooltip}
      <ButtonWrapper>
        <Button onClick={onHarvestRequest} variant="secondary">
          {t('Manuel Harvest')}
        </Button>
      </ButtonWrapper>
    </Flex>
  )
}

export default HarvestAction
