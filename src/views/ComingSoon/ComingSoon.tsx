/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading } from '@lydiafinance/uikit'
import useWeb3 from 'hooks/useWeb3'

import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'

const Airdrop: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <img src="/images/white_king.png" alt="Electrum POOL icon" width={300} height={300} />
        <Heading as="h1" size="xxl" mb="16px">
          {TranslateString(738, 'Coming Soon')}
        </Heading>
      </Hero>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;

  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;

  .center {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;

    li {
      margin-bottom: 4px;
    }
  }

  img {
    height: auto;
    max-width: 100%;
  }

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Airdrop
