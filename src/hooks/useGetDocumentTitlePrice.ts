import { useEffect } from 'react'
import { useGetApiPrice } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const lydPriceUsd = useGetApiPrice('lyd')

  useEffect(() => {
    document.title = `LydiaFinance ${lydPriceUsd ? `| $${lydPriceUsd?.toFixed(3)}` : ''}`
  }, [lydPriceUsd])
}
export default useGetDocumentTitlePrice
