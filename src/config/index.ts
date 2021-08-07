import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// TODO: sweet hack :)
export const AVAX_BLOCK_TIME = 1
export const LYD_PER_SECOND = new BigNumber(8)
export const SECOND_PER_YEAR = new BigNumber(60 * 60 * 24 * 365) // 31536000
export const BASE_URL = 'https://lydia.finance'
export const BASE_EXCHANGE_URL = 'https://exchange.lydia.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 10
export const LOTTERY_TICKET_PRICE = 500
export const BASE_AVAX_SCAN_URL = 'https://cchain.explorer.avax.network/'
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_PRICE = 5
