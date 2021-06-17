import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import { BIG_ZERO } from 'utils/bigNumber'
import UnlockButton from 'components/UnlockButton'
import { useGetApiPrice } from 'state/hooks'
import useLastUpdated from 'hooks/useLastUpdate'
import useGetMaximusUserInfo from 'hooks/maximus/useGetMaximusUserInfo'
import useGetMaximusSharesInfo from 'hooks/maximus/useGetMaximusSharesInfo'
import useGetMaximusFees from 'hooks/maximus/useGetMaximusFees'
import { Maximus } from 'state/types'
import AprRow from '../PoolCard/AprRow'
import AprRowCompare from '../PoolCard/AprRowCompare'
import StyledCard from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface LydVaultProps {
  pool: Maximus
  showStakedOnly?: boolean
  isHomeCard?: boolean
  farms?: any
}

const LydVaultCard: React.FC<LydVaultProps> = ({ pool, showStakedOnly, isHomeCard, farms }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const userInfo = useGetMaximusUserInfo(lastUpdated)
  const vaultFees = useGetMaximusFees()
  const { pricePerFullShare } = useGetMaximusSharesInfo()
  const { lpSymbol, totalStaked, userData } = pool
  const { depositAt, stakedBalance } = userData || {}
  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const timesCompoundedDaily = 12
  const accountHasSharesStaked = stakedBalance && stakedBalance.gt(0)
  // const stakingTokenPrice = useGetApiPrice(stakingToken?.symbol?.toLowerCase())
  const stakingTokenPrice = 1
  const isLoading = !pool.userData || !userInfo.shares
  const performanceFeeAsDecimal = vaultFees.performanceFee && parseInt(vaultFees.performanceFee, 10) / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isStaking={accountHasSharesStaked} isHomeCard={isHomeCard}>
      <StyledCardHeader stackingToken={lpSymbol} />
      <StyledCardBody isLoading={isLoading}>
        <AprRow
          farms={farms}
          pool={pool}
          stakingTokenPrice={stakingTokenPrice}
          isAutoVault
          compoundFrequency={timesCompoundedDaily}
          performanceFee={performanceFeeAsDecimal}
        />
        <AprRowCompare
          farms={farms}
          pool={pool}
          stakingTokenPrice={stakingTokenPrice}
          isAutoVault
          compoundFrequency={timesCompoundedDaily}
          performanceFee={performanceFeeAsDecimal}
        />
        <Box mt="8px">
          <UnstakingFeeCountdownRow
            withdrawalFee={vaultFees.withdrawalFee}
            withdrawalFeePeriod={vaultFees.withdrawalFeePeriod}
            lastDepositedTime={accountHasSharesStaked && depositAt}
          />
        </Box>
        <Flex mt="24px" flexDirection="column">
          {account ? (
            <VaultCardActions
              pool={pool}
              userInfo={userData}
              pricePerFullShare={pricePerFullShare}
              vaultFees={vaultFees}
              stakingTokenPrice={stakingTokenPrice}
              accountHasSharesStaked={accountHasSharesStaked}
              lastUpdated={lastUpdated}
              setLastUpdated={setLastUpdated}
              isLoading={isLoading}
            />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <UnlockButton />
            </>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter
        pool={pool}
        account={account}
        performanceFee={vaultFees.performanceFee}
        isAutoVault
        totalLydInVault={totalStaked}
      />
    </StyledCard>
  )
}

export default LydVaultCard
