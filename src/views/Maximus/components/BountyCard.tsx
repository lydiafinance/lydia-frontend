import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import useGetVaultFees from 'hooks/lydVault/useGetVaultFees'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetVaultBountyInfo from 'hooks/lydVault/useGetVaultBountyInfo'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const InlineText = styled(Text)`
  display: inline;
`

const BountyCard = () => {
  const { t } = useTranslation()
  const { estimatedLydBountyReward, estimatedDollarBountyReward, totalPendingLydHarvest } = useGetVaultBountyInfo()
  const { callFee } = useGetVaultFees()
  const [bounties, setBounties] = useState({
    modalLydBountyToDisplay: '',
    cardLydBountyToDisplay: '',
    dollarBountyToDisplay: '',
  })

  useEffect(() => {
    if (estimatedLydBountyReward && estimatedDollarBountyReward && totalPendingLydHarvest) {
      setBounties({
        modalLydBountyToDisplay: getFullDisplayBalance(estimatedLydBountyReward, 18, 5),
        cardLydBountyToDisplay: getFullDisplayBalance(estimatedLydBountyReward, 18, 3),
        dollarBountyToDisplay: getFullDisplayBalance(estimatedDollarBountyReward, 18, 2),
      })
    }
  }, [estimatedLydBountyReward, estimatedDollarBountyReward, totalPendingLydHarvest])

  const TooltipComponent = () => (
    <>
      <Text mb="16px">{`${t(`This bounty is given as a reward for providing a service to other users.`)}`}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto LYD Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t(`Auto-Compound Bounty: %fee%% of all Auto LYD pool users’ pending yield`, { fee: callFee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(
    <BountyModal
      lydBountyToDisplay={bounties.modalLydBountyToDisplay}
      dollarBountyToDisplay={bounties.dollarBountyToDisplay}
      totalPendingLydHarvest={totalPendingLydHarvest}
      callFee={callFee}
      TooltipComponent={TooltipComponent}
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Auto LYD Bounty')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>{bounties.cardLydBountyToDisplay || <Skeleton height={20} width={96} mb="2px" />}</Heading>
              <InlineText fontSize="12px" color="textSubtle">
                {bounties.dollarBountyToDisplay ? (
                  `~ ${bounties.dollarBountyToDisplay} USD`
                ) : (
                  <Skeleton height={16} width={62} />
                )}
              </InlineText>
            </Flex>
            <Button
              disabled={!bounties.dollarBountyToDisplay || !bounties.cardLydBountyToDisplay || !callFee}
              onClick={onPresentBountyModal}
              scale="sm"
            >
              {t('Claim')}
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
