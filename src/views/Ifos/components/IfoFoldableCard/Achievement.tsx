import React from 'react'
import styled from 'styled-components'
import { Flex, LinkExternal } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { Ifo } from 'config/constants/types'
import { getBscScanAddressUrl } from 'utils/avaxExplorer'

interface Props {
  ifo: Ifo
}

const Container = styled(Flex)`
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: initial;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  margin-top: 32px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }
`

const Achievement: React.FC<Props> = ({ ifo }) => {
  const { t } = useTranslation()
  const campaignTitle = ifo.name

  return (
    <Container>
      <Flex alignItems="flex-end" flexDirection="column">
        <StyledLinkExternal href={ifo.articleUrl} mb="8px">
          {t('Learn more about %title%', { title: campaignTitle })}
        </StyledLinkExternal>
        <StyledLinkExternal href={getBscScanAddressUrl(ifo.address)}>{t('View Contract')}</StyledLinkExternal>
      </Flex>
    </Container>
  )
}

export default Achievement
