import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@lydiafinance/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
`

const StyledCardHeader: React.FC<{
  stackingToken: string
  isFinished?: boolean
}> = ({ stackingToken, isFinished = false }) => {
  const { t } = useTranslation()
  const poolImageSrc = `${stackingToken}-automatic.svg`.toLocaleLowerCase()

  return (
    <Wrapper isFinished={isFinished} background="cardHeader">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} size="lg">
            {`${stackingToken}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'text'}>{t('Automatic restaking')}</Text>
        </Flex>
        <Image src={`/images/pools/${poolImageSrc}`} alt={stackingToken} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
