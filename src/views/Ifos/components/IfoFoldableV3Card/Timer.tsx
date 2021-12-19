import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Flex, PocketWatchIcon, Text, Skeleton } from '@lydiafinance/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { PublicIfoData } from 'hooks/ifo/types'

interface Props {
  publicIfoData: PublicIfoData
}

const Timer: React.FC<Props> = ({ publicIfoData }) => {
  const { t } = useTranslation()
  const { status, secondsUntilStart, secondsUntilEnd } = publicIfoData
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? t('Start').toLowerCase() : t('Finish').toLowerCase()
  return (
    <Flex justifyContent="center" mb="32px">
      {status === 'idle' ? (
        <Skeleton animation="pulse" variant="rect" width="100%" height="48px" />
      ) : (
        <>
          <PocketWatchIcon width="48px" mr="16px" />
          <Flex alignItems="center">
            <Text bold mr="16px">
              {suffix}:
            </Text>
            {status === 'coming_soon' && secondsUntilStart <= 60 ? (
              <Text>{t('in less than a minute')}</Text>
            ) : (
              <Text>
                {t('%day%d %hour%h %minute%m', {
                  day: timeUntil.days,
                  hour: timeUntil.hours,
                  minute: timeUntil.minutes,
                })}
              </Text>
            )}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default Timer
