import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { calculateLydEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  lydPrice?: BigNumber
  apy?: number
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(, 1fr);
  grid-template-rows: repeat(, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  lydPrice,
  apy,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfLyd = 1000 / lydPrice.toNumber()

  const lydEarnedPerThousand1D = calculateLydEarnedPerThousandDollars({ numberOfDays: 1, farmApy: apy, lydPrice })
  const lydEarnedPerThousand7D = calculateLydEarnedPerThousandDollars({ numberOfDays: 7, farmApy: apy, lydPrice })
  const lydEarnedPerThousand30D = calculateLydEarnedPerThousandDollars({ numberOfDays: 30, farmApy: apy, lydPrice })
  const lydEarnedPerThousand365D = calculateLydEarnedPerThousandDollars({
    numberOfDays: 365,
    farmApy: apy,
    lydPrice,
  })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {t('Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {t('ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {t('LYD per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: lydEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfLyd })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{lydEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: lydEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfLyd })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{lydEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: lydEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfLyd })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{lydEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: lydEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfLyd })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{lydEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {t(
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          {t('Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
