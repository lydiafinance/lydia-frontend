/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import useDeviceSize from '../../../hooks/useWindowSize'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  max-height: 168px;
`

export interface ApiTvlResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
}

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const tvl = "12,180,245";
  const deviceSize = useDeviceSize()
  const { isMobile } = deviceSize

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale={isMobile ? 'lg' : 'xl'} mb="12px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        {data ? (
          <>
            <Heading scale="xl">{`$${tvl}`}</Heading>
            <Text color="textSubtle">{t('Across all LPs and Electrum Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
