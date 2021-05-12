import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
} from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const LotteryProgress = () => {
  const { t } = useTranslation()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)

  return (
    <ProgressWrapper>
      <Progress primaryStep={getLotteryDrawStep(currentMillis)} secondaryStep={getTicketSaleStep()} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="contrast">
          {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
        </StyledPrimaryText>
        <Text fontSize="20px" bold color="invertedContrast">
          {lotteryHasDrawn ? t('Until ticket sale') : t('Until lottery draw')}
        </Text>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="invertedContrast">
            {timeUntilLotteryDraw} {t('Until lottery draw')}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
