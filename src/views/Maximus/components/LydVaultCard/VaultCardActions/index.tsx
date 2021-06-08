import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useLyd, useLydVaultContract } from 'hooks/useContract'
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
  lastUpdated,
  vaultFees,
  isLoading,
  setLastUpdated,
}) => {
  const { account } = useWeb3React()
  const { stakingToken, userData, lpSymbol, pid } = pool
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const lydContract = useLyd()
  const lydVaultContract = useLydVaultContract()
  const { t } = useTranslation()
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await lydContract.methods.allowance(account, lydVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, lydContract, lydVaultContract, lastUpdated])

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
