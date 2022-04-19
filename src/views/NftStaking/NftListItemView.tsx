/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Checkbox } from '@lydiafinance/uikit'

const NftListItemView = ({ nft, onSelectEvent, onDeselectEvent, isSelected }) => {
  const handleChange = () => {
    if (isSelected) {
      onDeselectEvent(nft)
    } else {
      onSelectEvent(nft)
    }
  }

  return (
    <div className="nft-card">
      <div className="nft-image" onClick={handleChange}>
        <img src={nft.tokenData.image} alt={`token-${nft.tokenId}`} />
      </div>
      <div className="nft-details">
        <div>
          <Checkbox checked={isSelected} onChange={handleChange} scale="sm" />
          {nft.tokenData.name}
        </div>
      </div>
    </div>
  )
}

export default NftListItemView
