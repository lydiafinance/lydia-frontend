import { BASE_AVAX_SCAN_URL } from 'config'

export const getBscScanAddressUrl = (address: string) => {
  return `${BASE_AVAX_SCAN_URL}/address/${address}`
}

export const getBscScanTransactionUrl = (transactionHash: string) => {
  return `${BASE_AVAX_SCAN_URL}/tx/${transactionHash}`
}

export const getBscScanBlockNumberUrl = (block: string | number) => {
  return `${BASE_AVAX_SCAN_URL}/block/${block}`
}

export const getBscScanBlockCountdownUrl = (block: string | number) => {
  return `${BASE_AVAX_SCAN_URL}/block/countdown/${block}`
}
