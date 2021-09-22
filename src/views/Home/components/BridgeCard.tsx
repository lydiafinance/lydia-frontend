import React from 'react'

import styled from 'styled-components'
import { Card, Heading, Link } from '@lydiafinance/uikit'

import { useTranslation } from '../../../contexts/Localization'
import useDeviceSize from '../../../hooks/useWindowSize'

const StyledBridgeCard = styled(Card)`
  color: ${({ theme }) => theme.colors.avalanche};
  height: 250px;
  display: flex;
  align-items: center;
  background-image: url('/images/gate1.png');
  background-position: center;
  background-size: contain;
  cursor: pointer;

  display: flex;
  align-items: baseline;
`

const CardBody = styled.a`
  padding: 10px 20px;
  cursor: pointer;
  height: 100%;
`

const BridgeImage = styled(Heading)<{ isMobile: boolean }>`
  /* background: #ffffffa6; */
  border-radius: 10px;
  padding: 5px;
  font-size: ${({ isMobile }) => `${isMobile ? '25px' : '38px'}`};
  color: #000;
  background-position: left;
  cursor: pointer;
`

// font-size: 30px;

const LinkStyled = styled(Link)<{ isMobile: boolean }>`
  position: absolute;
  z-index: 9999;
  height: 100%;
  width: 100%;
`

const BridgeCard = () => {
  const { t } = useTranslation()
  const deviceSize = useDeviceSize()
  const { isMobile } = deviceSize

  return (
    <StyledBridgeCard>
      {/* @ts-ignore */}
      <LinkStyled href="https://lydia.finance/launchpad" />
      <CardBody>
        {/* <BridgeImage src="/images/gate.svg" /> */}
        <BridgeImage isMobile={isMobile} color="#000" scale="xl">
          {/* {t('LYD Gate | Buy LYD on BSC')} */}
        </BridgeImage>
      </CardBody>
    </StyledBridgeCard>
  )
}

export default BridgeCard
