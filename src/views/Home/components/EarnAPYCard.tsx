/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@lydiafinance/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getFarmApr } from 'utils/apr'
import { useFarms, useGetApiPrices, useGetApiPrice } from 'state/hooks'
import { getAddress } from 'utils/addressHelpers'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard = () => {
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const prices = useGetApiPrices()
  const lydPrice = new BigNumber(useGetApiPrice('lyd'))

  const highestApr = useMemo(() => {
    const aprs = farmsLP
      // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
      .filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
      .map((farm) => {
        if (farm.lpTotalInQuoteToken && prices) {
          const quoteSymbol = farm?.quoteToken?.symbol
          const quoteTokenPriceUsd = prices[quoteSymbol.toLowerCase()]
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
          return getFarmApr(farm.poolWeight, lydPrice, totalLiquidity)
        }
        return null
      })

    const maxApr = max(aprs)
    return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }, [lydPrice, farmsLP, prices])

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
        <CardBody>
          <Heading color="contrast" size="lg">
            Earn up to
          </Heading>
          <CardMidContent color="#E60C41">
            {highestApr ? `${highestApr}% ${t('APR')} 🚀` : <Skeleton animation="pulse" variant="rect" height="44px" />}
          </CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" size="lg">
              in Farms
            </Heading>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
