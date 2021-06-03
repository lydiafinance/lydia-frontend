import React, { useState, useEffect } from 'react'
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
  const [lotteryStatus, setLotteryStatus] = useState({
    timeUntilLotteryDraw: '',
    timeUntilTicketSale: '',
    until_ts: 0,
    state: 'buy',
  })
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()

  useEffect(() => {
    if (!lotteryStatus?.until_ts)
      fetch(`https://api.lydia.finance/api/lotteryStatus`)
        .then((response) => response.json())
        .then((data) => {
          const timeUntilTicketSale = getTicketSaleTime(currentMillis)
          const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis, data?.until_ts)
          setLotteryStatus({ ...data, timeUntilTicketSale, timeUntilLotteryDraw })
        })
        .catch(() => {
          setLotteryStatus(null)
        })
  }, [currentMillis, lotteryStatus])

  return (
    <ProgressWrapper>
      <Progress
        primaryStep={getLotteryDrawStep(currentMillis, lotteryStatus?.until_ts, lotteryStatus?.state)}
        secondaryStep={getTicketSaleStep()}
        showProgressBunny
      />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="contrast">
          {lotteryHasDrawn ? lotteryStatus?.timeUntilTicketSale : lotteryStatus?.timeUntilLotteryDraw}
        </StyledPrimaryText>
        <Text fontSize="20px" bold color="text">
          {lotteryHasDrawn ? t('Until ticket sale') : t('Until lottery draw')}
        </Text>
      </TopTextWrapper>
      {lotteryHasDrawn && lotteryStatus?.state !== 'wait' && (
        <BottomTextWrapper>
          <Text color="text">
            {lotteryStatus?.timeUntilLotteryDraw} {t('Until lottery draw')}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
