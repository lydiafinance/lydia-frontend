/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Card, CardBody, Heading, Text, Flex, MetamaskIcon } from '@lydiafinance/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { registerToken } from 'utils/wallet'
import { getLydAddress } from 'utils/addressHelpers'
import { useGetApiPrice } from 'state/hooks'
import CardValue from './CardValue'
import useDeviceSize from '../../../hooks/useWindowSize'

import { LYD_PER_SECOND } from '../../../config/index'

const StyledLydStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  height: 100%;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

const LydStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const tokenAddress = getLydAddress()
  const burnedBalance = getBalanceNumber(useBurnedBalance(tokenAddress))
  const lydSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const deviceSize = useDeviceSize()
  const lydPrice = useGetApiPrice('lyd')
  const { isMobile } = deviceSize

  const imageSrc =
    'https://firebasestorage.googleapis.com/v0/b/photoai-92d2a.appspot.com/o/square_logo_bg.png?alt=media&token=b36d3d12-6cb8-4e83-b555-d9b8402350c6'

  return (
    <StyledLydStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('LYD Stats')}
        </Heading>
        {/* <Row>
          <Text fontSize="14px">{t('Circulating Supply')}</Text>
          {lydSupply && <CardValue fontSize="14px" value={lydSupply} />}
        </Row> */}
        <Row>
          <Text fontSize="14px">{t('Total LYD Supply 🦁')}</Text>
          {lydSupply && <CardValue fontSize="14px" value={lydSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total LYD Burned 🔥')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New LYD/second 🕒')}</Text>
          <CardValue fontSize="14px" decimals={0} value={Number(LYD_PER_SECOND)} />
        </Row>

        <Row>
          <Text fontSize="14px">{t('LYD Market Cap 💰')}</Text>
          <CardValue fontSize="14px" decimals={0} prefix="$" value={Number(lydSupply * lydPrice)} />
        </Row>

        <Row>
          <Text fontSize="14px">{t('LYD Price 💲')}</Text>
          <Text fontSize="14px">{t(`$${lydPrice?.toFixed(3)}`)}</Text>
        </Row>

        <Flex mb="4px">
          <TokenLink onClick={() => registerToken(tokenAddress, 'LYD', 18, imageSrc)}>Add LYD to Metamask</TokenLink>
          <MetamaskIcon height={15} width={15} ml="4px" />
        </Flex>
      </CardBody>
    </StyledLydStats>
  )
}

export default LydStats
