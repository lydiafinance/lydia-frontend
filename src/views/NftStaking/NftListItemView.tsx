/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Button, Checkbox } from '@lydiafinance/uikit'
import { useAvaxLionsNftContract } from 'hooks/useContract'
import { getNftStakeAddress } from 'utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'

const NftListItemView = ({ nft, onSelectEvent, onDeselectEvent, isSelected, refresh }) => {
  const { t } = useTranslation()
  const avaxLionContract = useAvaxLionsNftContract()
  const { account } = useWeb3React()
  const [isApproving, setApproving] = useState(false)
  const { toastSuccess, toastWarning, toastError } = useToast()

  const handleChange = () => {
    if (!nft.isApproved) {
      return
    }
    if (isSelected) {
      onDeselectEvent(nft)
    } else {
      onSelectEvent(nft)
    }
  }

  const handleApproveEvent = async () => {
    setApproving(true)
    avaxLionContract.methods.approve(getNftStakeAddress(), nft.tokenId)
    try {
      await avaxLionContract.methods
        .approve(getNftStakeAddress(), nft.tokenId)
        .send({ from: account })
        .on('transactionHash', (tx) => {
          toastSuccess(t('Success!'), t('You have successfully approved your avax lion.'))
          return tx.transactionHash
        })
    } catch ({ code }) {
      if (code === 4001) {
        toastWarning(t('Info'), t('Denied transaction signature.'))
      } else {
        toastError(t('Error'), t('Please refresh your page...'))
      }
    } finally {
      setApproving(false)
      refresh()
    }
  }

  return (
    <div className="nft-card">
      <div className="nft-image" onClick={handleChange}>
        <img
          className={nft.isApproved ? 'nft-approved' : 'nft-unapproved'}
          src={nft.tokenData.image}
          alt={`token-${nft.tokenId}`}
        />
      </div>
      <div className="nft-details">
        <div className="nft-name">
          {nft.isApproved && (
            <Checkbox className="nft-checkbox" checked={isSelected} onChange={handleChange} scale="sm" />
          )}
          {nft.tokenData.name}
        </div>
        {!nft.isApproved && (
          <Button scale="xs" variant="success" disabled={isApproving} onClick={handleApproveEvent}>
            {isApproving ? t('Approving...') : t('Approve')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default NftListItemView
