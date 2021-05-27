import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

const LayoutWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledImage = styled(Image)`
  align-self: center;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <LayoutWrapper>
      <StyledImage src="/images/lydia-lottery-girl-sales.png" alt="lottery bunny" width={280} height={300} />
      <StyledHeading size="lg" as="h3" color="secondary">
        {t('How it works')}
      </StyledHeading>
      <Text fontSize="16px">
        {t(
          'Spend LYD to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order!',
        )}
      </Text>
      <StyledLink href="https://docs.lydia.finance/guides/lottery/lottery-1">{t('Read more')}</StyledLink>
    </LayoutWrapper>
  )
}

export default HowItWorks
