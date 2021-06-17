import BigNumber from 'bignumber.js'
import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { VaultFees } from 'hooks/maximus/useGetMaximusFees'
import { Maximus, MaximusUserData } from 'state/types'
import VaultApprovalAction from './VaultApprovalAction'
import VaultStakeActions from './VaultStakeActions'
import HarvestAction from './HarvestAction'

const InlineText = styled(Text)`
  display: inline;
`

const LydVaultCardActions: React.FC<{
  pool: Maximus
  userInfo: MaximusUserData
  pricePerFullShare: BigNumber
  stakingTokenPrice: number
  accountHasSharesStaked: boolean
  lastUpdated: number
  vaultFees: VaultFees
  isLoading: boolean
  setLastUpdated: () => void
}> = ({
  pool,
  userInfo,
  pricePerFullShare,
  stakingTokenPrice,
  accountHasSharesStaked,
  vaultFees,
  isLoading,
  setLastUpdated,
}) => {
  const { userData, lpSymbol, pid } = pool
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { t } = useTranslation()

  const stakingTokenBalance = useMemo(() => {
    return userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  }, [userData.stakingTokenBalance])

  useEffect(() => {
    const checkApprovalStatus = async () => {
      if (userData.allowance) {
        setIsVaultApproved(userData.allowance.gt(stakingTokenBalance))
      }
    }

    checkApprovalStatus()
  }, [userData, stakingTokenBalance])

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Flex>
          <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
            {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
            LYD
          </Text>
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
            {t('Earned')}
          </Text>
        </Flex>
        <HarvestAction earnings={userData?.pendingReward} pid={pid} />
        <Box display="inline">
          <InlineText
            color={accountHasSharesStaked ? 'secondary' : 'textSubtle'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? `${lpSymbol} LP` : t(`stake`)}{' '}
          </InlineText>
          <InlineText
            color={accountHasSharesStaked ? 'textSubtle' : 'secondary'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? t(`staked (compounding)`) : `${lpSymbol} LP`}
          </InlineText>
        </Box>

        {isVaultApproved ? (
          <VaultStakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakingTokenPrice={stakingTokenPrice}
            vaultFees={vaultFees}
            userInfo={userInfo}
            pricePerFullShare={pricePerFullShare}
            accountHasSharesStaked={accountHasSharesStaked}
            setLastUpdated={setLastUpdated}
          />
        ) : (
          <VaultApprovalAction pool={pool} isLoading={isLoading} setLastUpdated={setLastUpdated} />
        )}
      </Flex>
    </Flex>
  )
}

export default LydVaultCardActions
