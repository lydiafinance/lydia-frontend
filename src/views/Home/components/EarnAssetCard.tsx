import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@lydiafinance/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#e60040, #f9f871);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAssetCard = () => {
  const activeNonLydPools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('LYD'))
  const latestPools: Pool[] = orderBy(activeNonLydPools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include LYD
  const assets = ['LYD', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="invertedContrast" size="lg">
          Earn
        </Heading>
        <CardMidContent color="invertedContrast">{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="invertedContrast" size="lg">
            in Pools
          </Heading>
          <NavLink exact activeClassName="active" to="/electrum" id="pool-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
