import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import { useWeb3React } from '@web3-react/core'
import { usePools } from 'state/hooks'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import AutoCompoundingCard from 'views/Home/components/AutoCompoundingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
// import EarnAssetCard from 'views/Home/components/EarnAssetCard'
// import WinCard from 'views/Home/components/WinCard'
import LydStats from 'views/Home/components/LydStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import BridgeCard from './components/BridgeCard'
import PoolCard from '../Pools/components/PoolCard'
import LydVaultCard from '../Pools/components/LydVaultCard'
import useDeviceSize from '../../hooks/useWindowSize'
import useTheme from '../../hooks/useTheme'

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
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const deviceSize = useDeviceSize()
  const { isMobile } = deviceSize
  const pools = usePools(account)
  const autoPool = useMemo(() => pools.find((pool) => pool.sousId === 0), [pools])
  const { isDark, toggleTheme } = useTheme()

  return (
    <Page>
      {/* <Hero>
        <Heading as="h1" scale="xl" mb="24px" color="secondary">
          {t('Lydia Finance')}
        </Heading>
        <Text>{t('AMM and yield farm on Avalanche.')}</Text>
      </Hero> */}
      {isDark ? (
        <img src="/images/crop-desktop-banner-dark.gif" alt="banner" className="banner" />
      ) : (
        <img src="/images/crop-desktop-banner-light.gif" alt="banner" className="banner" />
      )}

      <DesktopSupportCard isMobile={isMobile}>
        <Cards column={isMobile}>
          <Cards column>
            <BridgeCard />
            <FarmStakingCard />
          </Cards>

          <Cards column>
            <TotalValueLockedCard />
            <EarnAPYCard />
            <AutoCompoundingCard />
          </Cards>
        </Cards>
        <Cards column={isMobile}>
          <LotteryCard />
          <LydStats />
        </Cards>
      </DesktopSupportCard>

      <MobileSupportCard isMobile={isMobile}>
        <Cards column={isMobile}>
          <Cards column>
            <BridgeCard />

            <LydStats />
          </Cards>
          <Cards column>
            <TotalValueLockedCard />
            <EarnAPYCard />
          </Cards>
        </Cards>
        <Cards column={isMobile}>
          <LotteryCard />
          <FarmStakingCard />
          <AutoCompoundingCard />
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
