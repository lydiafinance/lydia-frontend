import React from 'react'
import { Flex, Button, useModal, Skeleton } from '@lydiafinance/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { Maximus, MaximusUserData } from 'state/types'
import { VaultFees } from 'hooks/maximus/useGetMaximusFees'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import VaultStakeModal from '../VaultStakeModal'
import HasSharesActions from './HasSharesActions'

interface VaultStakeActionsProps {
  pool: Maximus
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  userInfo: MaximusUserData
  accountHasSharesStaked: boolean
  pricePerFullShare: BigNumber
  isLoading?: boolean
  vaultFees: VaultFees
  setLastUpdated: () => void
}

const VaultStakeActions: React.FC<VaultStakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  userInfo,
  accountHasSharesStaked,
  pricePerFullShare,
  isLoading = false,
  vaultFees,
  setLastUpdated,
}) => {
  const { lpSymbol } = pool
  const { t } = useTranslation()
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={lpSymbol} />)
  const [onPresentStake] = useModal(
    <VaultStakeModal
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
        vaultFees={vaultFees}
      />
    ) : (
      <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>{t('Stake')}</Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default VaultStakeActions
