import styled from 'styled-components'
import { CardBody } from '@lydiafinance/uikit'

const SharedCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

export default SharedCardBody;