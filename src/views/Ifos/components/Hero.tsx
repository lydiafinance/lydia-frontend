import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@lydiafinance/uikit'
import Container from 'components/layout/Container'
import { useTranslation } from 'contexts/Localization'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #6b041d !important;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(0deg, #53dee9 0%, #1fc7d4 100%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <Container>
        <Title>{t('IFO: Initial Farm Offerings')}</Title>
        <Blurb>{t('Buy new tokens with a brand new token sale model.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
