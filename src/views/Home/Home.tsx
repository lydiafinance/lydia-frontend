import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@lydiafinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import { useWeb3React } from '@web3-react/core'
import { usePools } from 'state/hooks'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
// import LotteryCard from 'views/Home/components/LotteryCard'
// import EarnAssetCard from 'views/Home/components/EarnAssetCard'
// import WinCard from 'views/Home/components/WinCard'
import LydStats from 'views/Home/components/LydStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import PoolCard from '../Pools/components/PoolCard'
import useDeviceSize from '../../hooks/useWindowSize'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/pan-bg2.png'), url('/images/pan-bg.png');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)<{ column: boolean }>`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  flex-direction: ${({ column }) => `${column ? 'column' : 'row'}`};
  display: flex;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const MobileSupportCard = styled(BaseLayout)<{ isMobile: boolean }>`
  display: ${({ isMobile }) => `${isMobile ? 'block' : 'none'}`};
`

const DesktopSupportCard = styled(BaseLayout)<{ isMobile: boolean }>`
  display: flex;
  display: ${({ isMobile }) => `${isMobile ? 'none !important' : 'block'}`};
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const deviceSize = useDeviceSize()
  const { isMobile } = deviceSize
  const pools = usePools(account)

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'Lydia Finance')}
        </Heading>
        <Text>{TranslateString(578, 'AMM and yield farm on Avalanche.')}</Text>
      </Hero>

      <DesktopSupportCard isMobile={isMobile}>
        <Cards column={isMobile}>
          <FarmStakingCard />
          <Cards column>
            <EarnAPYCard />
            <TotalValueLockedCard />
          </Cards>
        </Cards>
        <Cards column={isMobile}>
          <PoolCard key={pools[0]?.sousId} pool={pools[0]} />
          <LydStats />
        </Cards>
      </DesktopSupportCard>

      <MobileSupportCard isMobile={isMobile}>
        <Cards column={isMobile}>
          <LydStats />
          <Cards column>
            <EarnAPYCard />
            <TotalValueLockedCard />
          </Cards>
        </Cards>
        <Cards column={isMobile}>
          <PoolCard key={pools[0]?.sousId} pool={pools[0]} />
          <FarmStakingCard />
        </Cards>
      </MobileSupportCard>
    </Page>
  )
}
// {/* <EarnAssetCard /> */}
// {/* <WinCard /> */}
// {/* <EarnAssetCard /> */}
// {/* <LotteryCard /> */}

export default Home
