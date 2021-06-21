import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, Heading, useModal, Skeleton } from '@lydiafinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { Maximus, MaximusUserData } from 'state/types'
import { VaultFees } from 'hooks/maximus/useGetMaximusFees'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToLyd } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'

interface HasStakeActionProps {
  pool: Maximus
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  userInfo: MaximusUserData
  pricePerFullShare: BigNumber
  vaultFees: VaultFees
  setLastUpdated: () => void
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  userInfo,
  pricePerFullShare,
  vaultFees,
  setLastUpdated,
}) => {
  const { lpSymbol, userData } = pool
  const stackedTokenBalance = getBalanceNumber(userInfo.stakedBalance, 18)

  const rawStakedUsd = getBalanceNumber(userData?.stakedUsd, 0)
  const displayBalanceUsd = rawStakedUsd.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={lpSymbol} />)

  const [onPresentStake] = useModal(
    <VaultStakeModal
      stakingMax={stakingTokenBalance}
      pool={pool}
      userInfo={userInfo}
      stakingTokenPrice={stakingTokenPrice}
      setLastUpdated={setLastUpdated}
    />,
  )

  const [onPresentUnstake] = useModal(
    <VaultStakeModal
      stakingMax={userInfo.stakedBalance}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      pricePerFullShare={pricePerFullShare}
      userInfo={userInfo}
      vaultFees={vaultFees}
      setLastUpdated={setLastUpdated}
      isRemovingStake
    />,
  )

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Heading>{stackedTokenBalance}</Heading>
        <Text fontSize="12px" color="textSubtle">{`~${
          stakingTokenPrice ? displayBalanceUsd : <Skeleton mt="1px" height={16} width={64} />
        } USD`}</Text>
      </Flex>
      <Flex>
        <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
          <MinusIcon color="primary" width="24px" />
        </IconButton>
        <IconButton variant="secondary" onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
          <AddIcon color="primary" width="24px" height="24px" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default HasSharesActions
