import React from 'react'
import { Checkbox } from '@lydiafinance/uikit'

const NftListItemView = ({ nft }) => (
  <div className="nft-card" key={nft.tokenId}>
    <div className="nft-image">
      <img src={nft.tokenData.image} alt={`token-${nft.tokenId}`} />
    </div>
    <div className="nft-details">
      <div>
        <Checkbox scale="sm" />
        {nft.tokenData.name}
      </div>
    </div>
  </div>
)

export default NftListItemView
