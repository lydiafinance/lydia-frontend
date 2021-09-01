import React from 'react'
import styled from 'styled-components'
import {
  Button,
  HelpIcon,
  Toggle,
  Text,
  Flex,
  Link as UiKitLink,
  ButtonMenu,
  ButtonMenuItem, NotificationDot,
} from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'

const ButtonText = styled(Text)`
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const StyledLink = styled(UiKitLink)`
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedFarms }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { url } = useRouteMatch()

  let activeIndex
  switch (location.pathname) {
    case '/maximus':
      activeIndex = 0
      break
    case '/maximus/history':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Flex alignItems="center" justifyContent="center" mb="32px" flexDirection={['column', null, 'row', null]}>
      <Flex alignItems='center' flexDirection={['column', null, 'row', null]} mb={[10, null, 0]}>
        <ButtonMenu activeIndex={activeIndex} scale='sm' variant='subtle'>
          <ButtonMenuItem as={Link} to={`${url}`}>
            {t('Live')}
          </ButtonMenuItem>
          <NotificationDot show={hasStakeInFinishedFarms}>
            <ButtonMenuItem as={Link} to={`${url}/history`}>
              {t('Finished')}
            </ButtonMenuItem>
          </NotificationDot>
        </ButtonMenu>
      </Flex>
      <Flex alignItems="center" flexDirection={['column', null, 'row', null]}  mb={[10, null, 0]}>
        <Flex mt={['4px', null, 0, null]} ml={[0, null, '24px', null]} justifyContent="center" alignItems="center">
          <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly((prev) => !prev)} />
          <Text ml="8px">{t('Staked only')}</Text>
        </Flex>
      </Flex>
      <Flex ml="24px" alignItems="center" justifyContent="flex-end">
        <StyledLink external href="https://docs.lydia.finance/guides/maximus/maximus-2">
          <Button px={['14px', null, null, null, '20px']} variant="subtle">
            <ButtonText color="backgroundAlt" bold fontSize="16px">
              {t('Help')}
            </ButtonText>
            <HelpIcon color="backgroundAlt" ml={[null, null, null, 0, '6px']} />
          </Button>
        </StyledLink>
      </Flex>
    </Flex>
  )
}

export default PoolTabButtons
