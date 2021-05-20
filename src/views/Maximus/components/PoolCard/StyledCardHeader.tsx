import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@lydiafinance/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
`

const StyledCardHeader: React.FC<{
  token: string
  quoteToken: string
  isAutoVault?: boolean
  isFinished?: boolean
}> = ({ token, quoteToken, isFinished = false, isAutoVault = false }) => {
  const { t } = useTranslation()
  const poolImageSrc = isAutoVault ? `lyd-lydvault.svg` : `${token}-${quoteToken}.svg`.toLocaleLowerCase()
  const isLydPool = token === 'LYD' && quoteToken === 'LYD'
  const background = isLydPool ? 'bubblegum' : 'cardHeader'

  const getSubHeading = () => {
    if (isAutoVault) {
      return `${t('Automatic restaking')}`
    }

    return `${t('Stake')} ${quoteToken}`
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} size="lg">
            {`${token}-${quoteToken}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'text'}>{getSubHeading()}</Text>
        </Flex>
        <Image src={`/images/pools/${poolImageSrc}`} alt={token} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
