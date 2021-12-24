import styled from 'styled-components'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@lydiafinance/uikit'

export const IfoLayout = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 40px 0;
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
`

export const StyledCard = styled(Card)`
  max-width: 736px;
  width: 100%;
  margin: auto;
`

export const Header = styled(CardHeader)<{ ifoId: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 112px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.svg')`};
`

export const FoldableContent = styled.div<{ isVisible: boolean; isActive: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  background: ${({ isActive, theme }) => (isActive ? theme.colors.gradients.bubblegum : theme.colors.dropdown)};
`

export const CardsWrapper = styled.div<{ singleCard: boolean }>`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-bottom: 32px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ singleCard }) => (singleCard ? '1fr' : '1fr 1fr')};
    justify-items: ${({ singleCard }) => (singleCard ? 'center' : 'unset')};
  }
`

export const StyledCardBody = styled(CardBody)`
  padding: 24px 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 24px;
  }
`

export const StyledCardFooter = styled(CardFooter)`
  text-align: center;
  padding: 8px;
  background: ${({ theme }) => theme.colors.card};
`

export default IfoLayout
