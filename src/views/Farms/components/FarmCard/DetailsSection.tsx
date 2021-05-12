import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@lydiafinance/uikit'

export interface ExpandableSectionProps {
  cChainExplorer?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  cChainExplorer,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{t('Stake')}:</Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{t('Total Liquidity')}:</Text>
          <Text>{totalValueFormatted}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={cChainExplorer} bold={false}>
          {t('View on C-Chain explorer')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
