import React from 'react'

import styled from "styled-components";
import {Card} from "@lydiafinance/uikit";

import {useTranslation} from "../../../contexts/Localization";

const StyledBridgeCard = styled(Card)`
  color: ${({theme}) => theme.colors.avalanche};
`

const CardBody = styled.a`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`

const BridgeImage = styled.img`
  margin-right: 6px;
  width: 24px;
  height: 24px
`

const BridgeLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`

const BridgeCard = () => {
    const {t} = useTranslation()

    return <StyledBridgeCard>
        <CardBody href="https://gate.lydia.finance">
            <BridgeImage src="/images/gate.svg"/>
            <BridgeLabel>{t('LYD Gate')}</BridgeLabel>
            {t('Buy LYD on BSC')}
        </CardBody>
    </StyledBridgeCard>
}

export default BridgeCard;
