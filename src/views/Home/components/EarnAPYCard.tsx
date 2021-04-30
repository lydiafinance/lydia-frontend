/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@lydiafinance/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { getFarmApy } from 'utils/apy'
import { useFarms, useGetApiPrices, useGetApiPrice } from 'state/hooks'

const StyledFarmStakingCard = styled(Card)`
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
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const prices = useGetApiPrices()
  const lydPrice = new BigNumber(useGetApiPrice('lyd'))

  const highestApy = useMemo(() => {
    const apys = farmsLP
      // Filter inactive farms, because their theoretical APY is super high. In practice, it's 0.
      .filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
      .map((farm) => {
        if (farm.lpTotalInQuoteToken && prices) {
          const quoteTokenPriceUsd = prices[farm.quoteToken.symbol.toLowerCase()]
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
          return getFarmApy(farm.poolWeight, lydPrice, totalLiquidity)
        }
        return null
      })

    const maxApy = max(apys)
    return maxApy?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }, [lydPrice, farmsLP, prices])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Earn up to
        </Heading>
        <CardMidContent color="#E60C41">
          {highestApy ? (
            `${highestApy}% ${TranslateString(736, 'APR')} 🚀`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in Farms
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
