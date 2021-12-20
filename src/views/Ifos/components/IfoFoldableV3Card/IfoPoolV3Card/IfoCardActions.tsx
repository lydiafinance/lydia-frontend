import React from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import { Button,Box,Alert,Text } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import { Ifo, PoolIds } from 'config/constants/types'
import { WalletIfoData, PublicIfoData } from 'hooks/ifo/types'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import ContributeButton from './ContributeButton'
import ClaimButton from './ClaimButton'
import LockedClaimButton from './LockedClaimButton'
import { SkeletonCardActions } from './Skeletons'

interface Props {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  hasProfile: boolean
  isLoading: boolean
}

const IfoCardActions: React.FC<Props> = ({
  poolId,
  ifo,
  publicIfoData,
  walletIfoData,
  hasProfile,
  isLoading,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const userPoolCharacteristics = walletIfoData[poolId]

  const { isEligible, minVaultBalance, userVaultBalance, isPreparationPeriod } = userPoolCharacteristics


  if (isLoading) {
    return <SkeletonCardActions />
  }

  if (!account) {
    return <UnlockButton width="100%" />
  }

  if (!hasProfile) {
    return (
      <Button as={Link} to="/profile" width="100%">
        {t('Activate your Profile')}
      </Button>
    )
  }

  if (!isEligible) {
    return (
      <>
        <Box mt="16px">
          <Alert title={t("To participate in this sale,")}>
            <Text fontSize="14px" as="p">{t("You need to stake on Lydian's Pool at least")} {getBalanceNumber(minVaultBalance)} LYD</Text>
            {userVaultBalance !== BIG_ZERO ? 
            <Text fontSize="12px" as="p">{t("Your current pool balance:")} : {getBalanceNumber(userVaultBalance)} </Text>
            : null}
          </Alert>
        </Box>
        <Button mt="15px" target="_blank" as={Link} to="/pools" width="100%">
          {t("Stake on Lydian's Pool")}
        </Button>
      </>
    )
  }

  return (
    <>
      {publicIfoData.status === 'live' && (
        <ContributeButton poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
      )}
      {publicIfoData.status === 'finished' &&
        !userPoolCharacteristics.hasClaimed &&
        (userPoolCharacteristics.offeringAmountInToken.isGreaterThan(0) ||
          userPoolCharacteristics.refundingAmountInLP.isGreaterThan(0)) && (
            isPreparationPeriod ? 
          <ClaimButton poolId={poolId} ifoVersion={ifo.version} walletIfoData={walletIfoData} />
          : 
          <LockedClaimButton
          poolId={poolId}
          ifoVersion={ifo.version}
          walletIfoData={walletIfoData}
          nextReleaseTimestamp={publicIfoData.nextReleaseTimestamp}
          />
        )}
      {publicIfoData.status === 'finished' &&
        userPoolCharacteristics.hasClaimed &&
        userPoolCharacteristics.purchasedTokens.isGreaterThan(userPoolCharacteristics.claimedTokens) &&
        publicIfoData.endTimestampNum < publicIfoData.nextReleaseTimestamp && (
          <LockedClaimButton
            poolId={poolId}
            ifoVersion={ifo.version}
            walletIfoData={walletIfoData}
            nextReleaseTimestamp={publicIfoData.nextReleaseTimestamp}
          />
        )}
    </>
  )
}

export default IfoCardActions
