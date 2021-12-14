import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
} from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BountyModal from './BountyModal'

const InlineText = styled(Text)`
  display: inline;
`

const useBountyToDisplay = (bountyInfo) => {
    const [info, setInfo] = useState({
      modalLydBountyToDisplay: '',
      cardLydBountyToDisplay: '',
      dollarBountyToDisplay: '',
    })
  
    useEffect(() => {
      if (bountyInfo.estimatedLydBountyReward && bountyInfo.estimatedDollarBountyReward && bountyInfo.totalPendingLydHarvest) {
        setInfo({
          modalLydBountyToDisplay: getFullDisplayBalance(bountyInfo.estimatedLydBountyReward, 18, 5),
          cardLydBountyToDisplay: getFullDisplayBalance(bountyInfo.estimatedLydBountyReward, 18, 3),
          dollarBountyToDisplay: getFullDisplayBalance(bountyInfo.estimatedDollarBountyReward, 18, 2),
        })
      }
    }, [bountyInfo.estimatedLydBountyReward, bountyInfo.estimatedDollarBountyReward, bountyInfo.totalPendingLydHarvest])
  
    return info
  }

const BountyCardItem = ({title,targetRef, callFee, TooltipComponent, bountyInfo}) => {
    const { t } = useTranslation()

    const bounties = useBountyToDisplay(bountyInfo)

    const [onPresentBountyModal] = useModal(
        <BountyModal
          lydBountyToDisplay={bounties.modalLydBountyToDisplay}
          dollarBountyToDisplay={bounties.dollarBountyToDisplay}
          totalPendingLydHarvest={bountyInfo.totalPendingLydHarvest}
          callFee={callFee}
          TooltipComponent={TooltipComponent}
        />,
    )

    return (
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="14px" bold color="textSubtle" mr="4px">
                {title}
                <br />
                {t("Auto LYD Bounty")}
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
    )
}

export default BountyCardItem;