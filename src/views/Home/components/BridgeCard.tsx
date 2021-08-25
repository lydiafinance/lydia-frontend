import React from 'react'

import styled from 'styled-components'
import { Card, Heading } from '@lydiafinance/uikit'

import { useTranslation } from '../../../contexts/Localization'

const StyledBridgeCard = styled(Card)`
  color: ${({ theme }) => theme.colors.avalanche};
  height: 168px;
  display: flex;
  align-items: center;
  background-image: url('/images/gate1.png');
  background-position-x: 1px;
  background-position-y: -90px;

  display: flex;
  align-items: baseline;
`

const CardBody = styled.a`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  text-shadow: 1px 2px #fff8d2;
`

const BridgeImage = styled(Heading)`
  background: #ffffffa6;
  border-radius: 10px;
  padding: 5px;
  font-size: 40px;
  color: #000px;
`

const BridgeCard = () => {
  const { t } = useTranslation()

  return (
    <StyledBridgeCard>
      <CardBody href="https://gate.lydia.finance">
        {/* <BridgeImage src="/images/gate.svg" /> */}

        <BridgeImage color="#000" scale="xl">
          {t('LYD Gate | Buy LYD on BSC')}
        </BridgeImage>
      </CardBody>
    </StyledBridgeCard>
  )
}

export default BridgeCard
