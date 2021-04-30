import { useEffect, useState } from 'react'

/*
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/lydiaswap/gatsby-lydia-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
export const baseUrl = 'https://api.lydia.finance/api/v1'

/* eslint-disable camelcase */

export interface ApiTvlResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiTvlResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/stat`)
        const responsedata: ApiTvlResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 10000)
    return () => clearInterval(interval)
  }, [setData])

  return data
}
