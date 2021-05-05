import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon } from '@lydiafinance/uikit'

const CoreTag = (props) => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon color="secondary" />} {...props}>
    Core
  </Tag>
)

const CommunityTag = (props) => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon color="secondary" />} {...props}>
    Community
  </Tag>
)

const AvaxTag = (props) => (
  <Tag variant="avalanche" outline startIcon={<CommunityIcon color="secondary" />} {...props}>
    Avalanche
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

export { CoreTag, CommunityTag, AvaxTag, DualTag }
