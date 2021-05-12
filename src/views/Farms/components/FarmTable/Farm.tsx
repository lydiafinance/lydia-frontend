import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, Image } from '@lydiafinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface FarmProps {
  label: string
  pid: number
  image: string
}

const IconImage = styled(Image)`
  width: 12px;
  height: 12px;
  position: absolute;
  left: 15px;
  top: -5px;

  * {
    border-radius: 20px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 24px;
    height: 24px;
  }
`
const TargetIconImage = styled(Image)`
  width: 20px;
  height: 20px;

  * {
    border-radius: 20px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold>
          {t('FARMING')}
        </Text>
      )
    }

    return null
  }

  const tokens = image?.split('-')

  return (
    <Container>
      <IconImage key={tokens[0]} src={`/images/tokens/${tokens[0]}.png`} alt="icon" width={40} height={40} mr="8px" />
      <TargetIconImage
        key={tokens[1]}
        src={`/images/tokens/${tokens[1]}.png`}
        alt="icon"
        width={40}
        height={40}
        mr="8px"
      />

      <div>
        {handleRenderFarming()}
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
