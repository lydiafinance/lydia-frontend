import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useLyd, useLydGovernanceContract } from 'hooks/useContract'
import { BIG_ZERO } from 'utils/bigNumber'
import { GovernanceFees } from 'hooks/lydGovernance/useGetGovernanceFees'
import { Pool } from 'state/types'
import { VaultUser } from 'views/Pools/types'
import GovernanceApprovalAction from './GovernanceApprovalAction'
import GovernanceStakeActions from './GovernanceStakeActions'

const InlineText = styled(Text)`
  display: inline;
`

const LydGovernanceCardActions: React.FC<{
  pool: Pool
  userInfo: VaultUser
  pricePerFullShare: BigNumber
  stakingTokenPrice: number
  accountHasSharesStaked: boolean
  lastUpdated: number
  governanceFees: GovernanceFees
  isLoading: boolean
  setLastUpdated: () => void
}> = ({
  pool,
  userInfo,
  pricePerFullShare,
  stakingTokenPrice,
  accountHasSharesStaked,
  lastUpdated,
  governanceFees,
  isLoading,
  setLastUpdated,
}) => {
  const { account } = useWeb3React()
  const { stakingToken, userData } = pool
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const lydContract = useLyd()
  const lydGovernanceContract = useLydGovernanceContract()
  const { t } = useTranslation()
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await lydContract.methods.allowance(account, lydGovernanceContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, lydContract, lydGovernanceContract, lastUpdated])

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Box display="inline">
          <InlineText
            color={accountHasSharesStaked ? 'secondary' : 'textSubtle'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? stakingToken.symbol : t(`stake`)}{' '}
          </InlineText>
          <InlineText
            color={accountHasSharesStaked ? 'textSubtle' : 'secondary'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? t(`staked (compounding)`) : `${stakingToken.symbol}`}
          </InlineText>
        </Box>
        {isVaultApproved ? (
          <GovernanceStakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakingTokenPrice={stakingTokenPrice}
            governanceFees={governanceFees}
            userInfo={userInfo}
            pricePerFullShare={pricePerFullShare}
            accountHasSharesStaked={accountHasSharesStaked}
            setLastUpdated={setLastUpdated}
          />
        ) : (
          <GovernanceApprovalAction pool={pool} isLoading={isLoading} setLastUpdated={setLastUpdated} />
        )}
      </Flex>
    </Flex>
  )
}

export default LydGovernanceCardActions
