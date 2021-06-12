/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@lydiafinance/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
`

const ImagesWrapper = styled.div`
  width: 100%;
  max-width: 55px;
  * {
    border-radius: 30px;
  }
  .target-token-symbol {
    top: -12px;
    left: 16px;
  }
  .token-symbol {
  }
`

const StyledCardHeader: React.FC<{
  stackingToken: string
  isFinished?: boolean
}> = ({ stackingToken, isFinished = false }) => {
  const { t } = useTranslation()
  const tokens = stackingToken?.split('-')

  return (
    <Wrapper isFinished={isFinished} background="cardHeader">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} size="lg">
            {`${stackingToken} LP`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'text'}>{t('Maximizer')}</Text>
        </Flex>

        <ImagesWrapper>
          <Image
            className="token-symbol"
            key="axaa"
            src={`/images/tokens/${tokens[0]?.toLowerCase()}.png`}
            width={32}
            height={32}
          />
          <Image
            className="target-token-symbol"
            key="axaa1"
            src={`/images/tokens/${tokens[1]?.toLowerCase()}.png`}
            width={42}
            height={42}
          />
        </ImagesWrapper>
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
