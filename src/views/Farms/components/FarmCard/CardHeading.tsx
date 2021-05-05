/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@lydiafinance/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
  targetTokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const ImagesWrapper = styled.div`
  width: 100%;
  * {
    border-radius: 30px;
  }
  .target-token-symbol {
    top: -12px;
    left: 16px;
  }
  .token-symbol {
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
  targetTokenSymbol,
}) => {
  const tokens = farmImage?.split('-')

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <ImagesWrapper>
        <Image
          className="token-symbol"
          key={tokens[0]}
          src={`/images/tokens/${tokens[0]?.toLowerCase()}.png`}
          alt={farmImage}
          width={28}
          height={28}
        />
        <Image
          className="target-token-symbol"
          key={tokens[1]}
          src={`/images/tokens/${tokens[1]?.toLowerCase()}.png`}
          alt={targetTokenSymbol}
          width={38}
          height={38}
        />
      </ImagesWrapper>

      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
