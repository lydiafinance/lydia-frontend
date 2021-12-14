import React from 'react'
import { Flex, Button, useModal, Skeleton } from '@lydiafinance/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import { GovernanceFees } from 'hooks/lydGovernance/useGetGovernanceFees'
import { VaultUser } from 'views/Pools/types'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import GovernanceStakeModal from '../GovernanceStakeModal'
import HasSharesActions from './HasSharesActions'

interface GovernanceStakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  userInfo: VaultUser
  accountHasSharesStaked: boolean
  pricePerFullShare: BigNumber
  isLoading?: boolean
  governanceFees: GovernanceFees
  setLastUpdated: () => void
}

const GovernanceStakeActions: React.FC<GovernanceStakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  userInfo,
  accountHasSharesStaked,
  pricePerFullShare,
  isLoading = false,
  governanceFees,
  setLastUpdated,
}) => {
  const { stakingToken } = pool
  const { t } = useTranslation()
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(
    <GovernanceStakeModal
      stakingMax={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      userInfo={userInfo}
      pool={pool}
      setLastUpdated={setLastUpdated}
    />,
  )

  const renderStakeAction = () => {
    return accountHasSharesStaked ? (
      <HasSharesActions
        pool={pool}
        stakingTokenBalance={stakingTokenBalance}
        stakingTokenPrice={stakingTokenPrice}
        userInfo={userInfo}
        pricePerFullShare={pricePerFullShare}
        setLastUpdated={setLastUpdated}
        governanceFees={governanceFees}
      />
    ) : (
      <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>{t('Stake')}</Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default GovernanceStakeActions
