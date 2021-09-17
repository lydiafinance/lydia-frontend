import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Farm } from 'state/types'
import tokens from 'config/constants/tokens'

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, avaxPriceUsdt: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === tokens.usdt.symbol) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === tokens.wavax.symbol) {
    return hasTokenPriceVsQuote ? avaxPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for USDT/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't USDT or WAVAX, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - USDT price
  if (quoteTokenFarm.quoteToken.symbol === tokens.wavax.symbol) {
    const quoteTokenInUsdt = avaxPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === tokens.usdt.symbol) {
    const quoteTokenInUsdt = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed USDT/WAVAX quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm: Farm, quoteTokenFarm: Farm, avaxPriceUsdt: BigNumber): BigNumber => {
  if (farm.quoteToken.symbol === 'USDT') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WAVAX') {
    return avaxPriceUsdt
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WAVAX') {
    return quoteTokenFarm.tokenPriceVsQuote ? avaxPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDT') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms: Farm[]) => {
  const avaxUsdtFarm = farms.find((farm) => farm.pid === 17)
  const avaxPriceUsdt = avaxUsdtFarm.tokenPriceVsQuote ? BIG_ONE.div(avaxUsdtFarm.tokenPriceVsQuote) : BIG_ZERO

  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const tokenPriceUsdt = getFarmBaseTokenPrice(farm, quoteTokenFarm, avaxPriceUsdt)
    const quoteTokenPriceUsdt = getFarmQuoteTokenPrice(farm, quoteTokenFarm, avaxPriceUsdt)

    return {
      ...farm,
      tokenPriceUsdt: tokenPriceUsdt.toJSON(),
      quoteTokenPriceUsdt: quoteTokenPriceUsdt.toJSON(),
    }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
