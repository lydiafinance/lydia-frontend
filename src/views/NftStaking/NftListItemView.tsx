/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Button, Checkbox } from '@lydiafinance/uikit'
import { useAvaxLionsNftContract } from 'hooks/useContract'
import { getNftStakeAddress } from 'utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'

const NftListItemView = ({ nft, onSelectEvent, onDeselectEvent, isSelected }) => {
  const { t } = useTranslation()
  const avaxLionContract = useAvaxLionsNftContract()
  const { account } = useWeb3React()
  const [isApproving, setApproving] = useState(false)

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
          return tx.transactionHash
        })
    } catch (error) {
      console.log(error)
    } finally {
      setApproving(false)
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
          {nft.isApproved && <Checkbox checked={isSelected} onChange={handleChange} scale="sm" />}
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
