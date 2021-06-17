import React, { useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { Maximus } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'

interface ApprovalActionProps {
  pool: Maximus
  setLastUpdated: () => void
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ pool, isLoading = false, setLastUpdated }) => {
  const { account } = useWeb3React()
  const { lpSymbol } = pool
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const web3 = useWeb3()
  const lpContract = getBep20Contract(getAddress(pool.stakingToken), web3)

  const handleApprove = () => {
    lpContract.methods
      .approve(getAddress(pool.contractAddress), ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(
          `${t('Contract Enabled')}`,
          `${t(`You can now stake in the %symbol% vault!`, { symbol: lpSymbol })}`,
        )
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(
          `${t('Error')}`,
          `${t(`Please try again. Confirm the transaction and make sure you are paying enough gas!`)}`,
        )
        setRequestedApproval(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          {t('Enable')}
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
