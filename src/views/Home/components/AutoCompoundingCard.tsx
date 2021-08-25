import React from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Card, Heading } from '@lydiafinance/uikit'

import useLastUpdated from '../../../hooks/useLastUpdate'
import useGetVaultUserInfo from '../../../hooks/lydVault/useGetVaultUserInfo'
import { convertSharesToLyd } from '../../Pools/helpers'

import useGetVaultSharesInfo from '../../../hooks/lydVault/useGetVaultSharesInfo'
import { useGetApiPrice, useMaximusPools } from '../../../state/hooks'

import { BIG_TEN } from '../../../utils/bigNumber'
import { useTranslation } from '../../../contexts/Localization'
import CardValue from './CardValue'
import CardUsdValue from './CardUsdValue'

const CardBody = styled.div`
  padding: 10px 20px;
`

const StyledAutoCompoundingCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  max-height: 168px;
`

const CardHeader = styled.div`
  color: ${({ theme }) => theme.colors.avalanche};
  font-weight: bold;
`

const CardNumbers = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-gap: 4px;
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  font-size: 28px;
`

const AutoCompoundingCard = () => {
  const { t } = useTranslation()
  const { lastUpdated } = useLastUpdated()
  const { account } = useWeb3React()

  const lydPrice = useGetApiPrice('lyd')

  // Auto LYD
  const autoVaultUserInfo = useGetVaultUserInfo(lastUpdated)
  const { pricePerFullShare: autoVaultPerShare } = useGetVaultSharesInfo()

  const currentSharesAsLyd = convertSharesToLyd(autoVaultUserInfo.shares, autoVaultPerShare)
  const autoLydProfit = currentSharesAsLyd.lydAsBigNumber.minus(autoVaultUserInfo.lydAtLastUserAction)
  const autoLydEarnings = new BigNumber(autoLydProfit).dividedBy(BIG_TEN.pow(18)).toNumber()

  // Maximus
  const maximusPools = useMaximusPools(account)

  let maximusProfit = 0

  maximusPools.forEach((p) => {
    maximusProfit += p.userData.pendingReward.toNumber()
  })

  const earningsSum = maximusProfit + autoLydEarnings

  const earningsUsdt = earningsSum * lydPrice
  return (
    <>
      <StyledAutoCompoundingCard>
        <CardBody>
          <Heading color="contrast" scale="lg">
            {t('Auto-Compounding LYD Earnings')}
          </Heading>
          <CardNumbers>
            {/* <CardValue value={earningsSum} fontSize="32px" lineHeight="1.5" /> */}

            <CardMidContent color="#E60C41">{earningsSum}</CardMidContent>
            <CardUsdValue key={earningsUsdt} value={earningsUsdt} />
          </CardNumbers>
        </CardBody>
      </StyledAutoCompoundingCard>
    </>
  )

  return null
}

export default AutoCompoundingCard
