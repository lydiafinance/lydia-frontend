import React from 'react'
import styled from 'styled-components'
import { Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled.div`
  display: flex;
  margin: 36px 0 28px;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
`

const Circle = styled.div<{ isPoolSize?: any }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ isPoolSize, theme }) => (isPoolSize ? '#15B0F8' : '#D4068E')};
  margin-right: 6px;
`

const Legend = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <LegendItem>
        <Circle isPoolSize />
        <Text>{t('Pool Size')}</Text>
      </LegendItem>
      <LegendItem>
        <Circle />
        <Text>{t('Burned')}</Text>
      </LegendItem>
    </Wrapper>
  )
}

export default Legend
