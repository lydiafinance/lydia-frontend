import React, { useState, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading } from '@lydiafinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import { usePools, useBlock } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const { currentBlock } = useBlock()
  const [stakedOnly, setStakedOnly] = useState(false)
  const { isDark } = useTheme()

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || currentBlock > pool.endBlock),
    [currentBlock, pools],
  )
  const stakedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Electrum Pool')}
          </Heading>

          <Heading as="h6" size="md" mb="5px">
            {TranslateString(580, 'Stake LYD to earn new tokens.')}
          </Heading>
          <Heading as="h6" size="md" mb="5px">
            {TranslateString(486, 'You can unstake at any time.')}
          </Heading>
          <Heading as="h6" size="md" mb="5px">
            {TranslateString(406, 'Rewards are calculated per second.')}
          </Heading>
          {/* <ul>
            <li>{TranslateString(580, 'Stake LYD to earn new tokens.')}</li>
            <li>{TranslateString(486, 'You can unstake at any time.')}</li>
            <li>{TranslateString(406, 'Rewards are calculated per second.')}</li>
          </ul> */}
        </div>
        {!isDark ? (
          <img src="/images/electrum.png" alt="Electrum POOL icon" width={450} height={317} />
        ) : (
          <img src="/images/dark_electrum.png" alt="Electrum POOL icon" width={450} height={317} />
        )}
      </Hero>
      {/* <PoolTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} /> */}
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {stakedOnly
              ? orderBy(stakedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
              : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
            {/* <Coming /> */}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
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

export default Farm
