/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Text } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getLydAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { useGetApiPrice } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardUsdValue from './CardUsdValue'

const LydWalletBalance = () => {
  const [usdtBalance, setUsdtBalance] = useState(0)
  const { t } = useTranslation()
  const lydPrice = useGetApiPrice('lyd')
  const lydBalance = useTokenBalance(getLydAddress())

  const balanceNumber = getBalanceNumber(lydBalance)
  const { account } = useWeb3React()

  useEffect(() => {
    const _usdtBalance = new BigNumber(balanceNumber).multipliedBy(lydPrice).toNumber()
    setUsdtBalance(_usdtBalance)
  }, [lydBalance, setUsdtBalance, lydPrice])

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={balanceNumber} decimals={4} fontSize="24px" lineHeight="36px" />
      <CardUsdValue key={usdtBalance} value={usdtBalance} />
    </>
  )
}

export default LydWalletBalance
