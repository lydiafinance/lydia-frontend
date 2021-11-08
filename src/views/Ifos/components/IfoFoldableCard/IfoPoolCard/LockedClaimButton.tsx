import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, Button } from '@lydiafinance/uikit'
import { PoolIds } from 'config/constants/types'
import { WalletIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import getTimePeriods from 'utils/getTimePeriods'

interface Props {
  poolId: PoolIds
  ifoVersion: number
  walletIfoData: WalletIfoData
  nextReleaseTimestamp: number
}

const ClaimButton: React.FC<Props> = ({ poolId, ifoVersion, walletIfoData, nextReleaseTimestamp }) => {
  const userPoolCharacteristics = walletIfoData[poolId]
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { toastError, toastSuccess } = useToast()

  const setPendingTx = (isPending: boolean) => walletIfoData.setPendingTx(isPending, poolId)
  const isClaimable = userPoolCharacteristics.claimableTokens.isGreaterThan(0)
  const timeUntil = getTimePeriods(nextReleaseTimestamp - Math.floor(Date.now() / 1000))

  const handleClaim = async () => {
    try {
      setPendingTx(true)

      if (ifoVersion === 1) {
        await walletIfoData.contract.methods.harvest().send({ from: account })
      } else {
        await walletIfoData.contract.methods.harvestPool(poolId === PoolIds.poolBasic ? 0 : 1).send({ from: account })
      }

      walletIfoData.setIsClaimed(poolId)
      toastSuccess(t('Success!'), t('You have successfully claimed your rewards.'))
    } catch (error) {
      toastError(t('Error'), error?.message)
      console.error(error)
    } finally {
      setPendingTx(false)
    }
  }

  if (isClaimable) {
    return (
      <Button
        onClick={handleClaim}
        disabled={userPoolCharacteristics.isPendingTx}
        width="100%"
        isLoading={userPoolCharacteristics.isPendingTx}
        endIcon={userPoolCharacteristics.isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {t('Claim')}
      </Button>
    )
  }

  return (
    <Button disabled width="100%">
      Next round:{' '}
      {t('%day%d %hour%h %minute%m', {
        day: timeUntil.days,
        hour: timeUntil.hours,
        minute: timeUntil.minutes,
      })}
    </Button>
  )
}

export default ClaimButton
