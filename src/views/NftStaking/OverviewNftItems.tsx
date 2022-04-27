import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  img {
    width: 75px;
    border-radius: 20px;
  }
`

const OverviewNftItem = ({
  nft: {
    tokenData: { image },
  },
}) => {
  return (
    <Wrapper>
      <img src={image} alt="nft-token" />
    </Wrapper>
  )
}

export default OverviewNftItem
