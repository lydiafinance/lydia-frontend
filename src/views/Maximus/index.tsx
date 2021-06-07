import React, { useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex } from '@lydiafinance/uikit'

import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useMaximusPools, useBlock } from 'state/hooks'
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
  console.log(`pools`, pools)
  const { currentBlock } = useBlock()
  const [stakedOnly, setStakedOnly] = usePersistState(false, 'lydia_pool_staked')

  const stakedOnlyPools = useMemo(
    () => pools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [pools],
  )

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" size="xxl" color="text" mb="24px">
              {t('Maximus Farm ✨')}
            </Heading>
            <Heading size="md" color="text">
              {t('Stake LP token to earn automatically.')}
            </Heading>
            <Heading size="md" color="text">
              {t('High APY, low risk, no effort, no fee.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly
              ? orderBy(stakedOnlyPools, ['sortOrder']).map((pool) => (
                  <LydVaultCard pool={pool} showStakedOnly={stakedOnly} />
                ))
              : orderBy(pools, ['sortOrder']).map((pool) => <LydVaultCard pool={pool} showStakedOnly={stakedOnly} />)}
          </Route>
        </FlexLayout>
      </Page>
    </>
  )
}

export default Pools
