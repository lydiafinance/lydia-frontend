/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Lottie from 'lottie-react-web'
import { Box, Heading, Text } from '@lydiafinance/uikit'
import Container from 'components/layout/Container'
import { useTranslation } from 'contexts/Localization'
import animation from '../../../animations/launchpad.json'

const getGradient = (isDark: boolean) => {
  if (isDark) {
    return 'repeating-linear-gradient(to right, #332453, #332453 40px, #281D44 40px, #281D44 80px)'
  }

  return 'repeating-linear-gradient(to right, #ffef98, #ffef98 40px, #fcf4cc 40px, #fcf4cc 80px)'
}

const StyledHero = styled.div`
  background: ${({ theme }) => getGradient(theme.isDark)};
  padding-bottom: 40px;
  padding-top: 40px;
`

const CurtainBottom = styled.div`
  background-image: url('/images/curtain-bottom-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.png');
  background-repeat: repeat-x;
  background-size: contain;
  height: 20px;
`

const Hero = () => {
  const { t } = useTranslation()
  const [loop, setLoop] = useState(true)
  let timer

  useEffect(() => {
    timer = setTimeout(() => setLoop(false), 6000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Container>
      <Lottie
        options={{
          animationData: animation,
          loop,
        }}
      />
    </Container>
  )
}

export default Hero
