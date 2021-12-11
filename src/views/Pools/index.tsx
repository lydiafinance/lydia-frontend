import React, { useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex } from '@lydiafinance/uikit'
import Lottie from 'lottie-react-web'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { usePools, useBlock } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import PoolCard from './components/PoolCard'
import LydVaultCard from './components/LydVaultCard'
import LydGovPoolCard from './components/LydGovPoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import BountyCard from './components/BountyCard'
import animation from '../../animations/electrum.json'
import useDeviceSize from '../../hooks/useWindowSize'

const Pools: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const deviceSize = useDeviceSize()
  const pools = usePools(account)
  const { currentBlock } = useBlock()
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'lydia_pool_staked' })

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || currentBlock > pool.endBlock),
    [currentBlock, pools],
  )
  const stakedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )
  const hasStakeInFinishedPools = useMemo(
    () => finishedPools.some((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [finishedPools],
  )
  // This pool is passed explicitly to the lyd vault
  const lydPoolData = useMemo(() => openPools.find((pool) => pool.sousId === 0), [openPools])

  // This pool is passed explicitly to the lyd governance pool
  const lydGovPoolData = useMemo(() => openPools.find((pool) => pool.sousId === 0), [openPools])

  const { isDesktop } = deviceSize

  return (
    <>
      <PageHeader background="transparent">
        <Flex justifyContent="space-between" flexDirection={['column', null, 'row']}>
          {/* <Flex flexDirection="column">
            <Lottie
              options={{
                animationData: animation,
              }}
            />
          </Flex> */}

          <Flex
            height="fit-content"
            justifyContent="center"
            alignItems="center"
            flexWrap={!isDesktop ? 'wrap' : 'nowrap'}
            mt={['24px', null, '0px']}
          >
            <Lottie
              options={{
                animationData: animation,
              }}
            />
            <BountyCard />
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          hasStakeInFinishedPools={hasStakeInFinishedPools}
        />
        <FlexLayout>
          <Route exact path={`${path}`}>
            <>
              <LydVaultCard pool={lydPoolData} showStakedOnly={stakedOnly} />
              <LydGovPoolCard pool={lydGovPoolData} showStakedOnly={stakedOnly} />
              {stakedOnly
                ? orderBy(stakedOnlyPools, ['sortOrder']).map((pool) => (
                    <PoolCard key={pool.sousId} pool={pool} account={account} />
                  ))
                : orderBy(openPools, ['sortOrder']).map((pool) => (
                    <PoolCard key={pool.sousId} pool={pool} account={account} />
                  ))}
            </>
          </Route>
          <Route path={`${path}/history`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} account={account} />
            ))}
          </Route>
        </FlexLayout>
      </Page>
    </>
  )
}

export default Pools
