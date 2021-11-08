import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex } from '@lydiafinance/uikit'

import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useMaximusPools, useFarms } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import LydVaultCard from './components/LydVaultCard'
import PoolTabButtons from './components/PoolTabButtons'

const Pools: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const pools = useMaximusPools(account)
  const { data: farms } = useFarms()

  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'lydia_pool_staked' })

  const activePools = pools.filter((pool) => !pool.isFinished)
  const stakedOnlyPools = activePools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const inActivePools = pools.filter((pool) => pool.isFinished)
  const stakedInactivePools = inActivePools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  return (
    <>
      <PageHeader>
        <Flex justifyContent="center" alignItems="center" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]} alignItems="center">
            <Heading as="h1" scale="xxl" color="text" mb="24px">
              {t('Maximizer Farms')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Stake LP token to earn automatically.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APY, low risk, no effort, no fee.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          hasStakeInFinishedFarms={stakedInactivePools.length > 0}
        />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly
              ? orderBy(stakedOnlyPools, ['sortOrder']).map((pool) => (
                  <LydVaultCard pool={pool} showStakedOnly={stakedOnly} farms={farms} key={pool.pid} />
                ))
              : orderBy(activePools, ['sortOrder']).map((pool) => (
                  <LydVaultCard pool={pool} showStakedOnly={stakedOnly} farms={farms} key={pool.pid} />
                ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {stakedOnly
              ? orderBy(stakedInactivePools, ['sortOrder']).map((pool) => (
                  <LydVaultCard pool={pool} showStakedOnly={stakedOnly} farms={farms} key={pool.pid} />
                ))
              : orderBy(inActivePools, ['sortOrder']).map((pool) => (
                  <LydVaultCard pool={pool} showStakedOnly={stakedOnly} farms={farms} key={pool.pid} />
                ))}
          </Route>
        </FlexLayout>
      </Page>
    </>
  )
}

export default Pools
