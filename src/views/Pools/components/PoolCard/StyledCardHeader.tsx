import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@lydiafinance/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
`

const StyledCardHeader: React.FC<{
  earningTokenSymbol: string
  stakingTokenSymbol: string
  isAutoVault?: boolean
  isFinished?: boolean
}> = ({ earningTokenSymbol, stakingTokenSymbol, isFinished = false, isAutoVault = false }) => {
  const { t } = useTranslation()
  const poolImageSrc = isAutoVault
    ? `lyd-lydvault.svg`
    : `${earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase()
  const isLydPool = earningTokenSymbol === 'LYD' && stakingTokenSymbol === 'LYD'
  const background = isLydPool ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return `${t('Auto')}`
    }
    if (isLydPool) {
      // manual lyd
      return `${t('Manual')}`
    }
    // all other pools
    return `${t('Earn')}`
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return `${t('Automatic restaking')}`
    }
    if (isLydPool) {
      return `${t('Earn LYD, stake LYD')}`
    }
    return `${t('Stake')} ${stakingTokenSymbol}`
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} size="lg">
            {`${getHeadingPrefix()} ${earningTokenSymbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'text'}>{getSubHeading()}</Text>
        </Flex>
        <Image src={`/images/pools/${poolImageSrc}`} alt={earningTokenSymbol} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
