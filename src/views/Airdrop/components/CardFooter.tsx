import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, MetamaskIcon } from '@lydiafinance/uikit'
import { CommunityTag, CoreTag, AvaxTag } from 'components/Tags'
import { useBlock } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import { registerToken } from 'utils/wallet'

const tags = {
  [PoolCategory.AVALANCHE]: AvaxTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  tokenName: string
  tokenAddress: string
  tokenDecimals: number
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled(Flex)`
  align-items: center;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

const CardFooter: React.FC<Props> = ({ tokenAddress, tokenName, tokenDecimals }) => {
  const imageSrc =
    'https://firebasestorage.googleapis.com/v0/b/photoai-92d2a.appspot.com/o/square_logo_bg.png?alt=media&token=b36d3d12-6cb8-4e83-b555-d9b8402350c6'

  return (
    <StyledFooter isFinished={false}>
      <Details>
        {tokenAddress && (
          <Flex mb="4px">
            <TokenLink onClick={() => registerToken(tokenAddress, tokenName, tokenDecimals, imageSrc)}>
              Add {tokenName} to Metamask
            </TokenLink>
            <MetamaskIcon height={15} width={15} ml="4px" />
          </Flex>
        )}
      </Details>
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
