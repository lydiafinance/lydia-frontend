import React from 'react'
import { Text } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { useGetApiPrice } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardUsdValue from './CardUsdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const LydHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  let earningsUsdt
  const lydPrice = useGetApiPrice('lyd')

  if (earningsSum > 0) {
    earningsUsdt = new BigNumber(earningsSum).multipliedBy(lydPrice).toNumber()
  } else {
    earningsUsdt = 0
  }

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      <CardUsdValue key={earningsUsdt} value={earningsUsdt} />
    </Block>
  )
}

export default LydHarvestBalance
