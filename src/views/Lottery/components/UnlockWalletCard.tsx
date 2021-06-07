import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const UnlockWalletCard = () => {
  const { t } = useTranslation()

  return (
    <Card isActive>
      <StyledCardBody>
        <IconWrapper>
          <CardImage src="/images/ticket.png" alt="lyd logo" width={94} height={84} />
        </IconWrapper>
        <StyledHeading size="md">{t('Unlock wallet to access lottery')}</StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
