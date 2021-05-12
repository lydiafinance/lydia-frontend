import React from 'react'
import styled from 'styled-components'
import { HelpIcon } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'

import Tooltip from '../Tooltip/Tooltip'

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : '-'
  const { t } = useTranslation()

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <Tooltip
        content={
          <div>
            {t('The multiplier represents the amount of LYD rewards each farm gets.')}
            <br />
            <br />
            {t(
              'For example, if a 1x farm was getting 1 LYD per second, a 40x farm would be getting 40 LYD per second.',
            )}
          </div>
        }
      >
        <HelpIcon color="textSubtle" />
      </Tooltip>
    </Container>
  )
}

export default Multiplier
