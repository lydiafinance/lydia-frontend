import React from 'react'
import styled from 'styled-components'
import { Heading } from '@lydiafinance/uikit'

import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'

const Airdrop: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Hero>
        <a href="https://medium.com/@lydiafinance/the-lydia-launchpad-is-coming-33dc5a141656">
          <Heading as="h1" scale="xxl" mb="16px">
            {t('Coming Soon')}
          </Heading>
          <img src="/images/launchpad.png" alt="Electrum POOL icon" width={2000} height={300} />
        </a>
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

  img {
    border-radius: 10px;
  }

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
