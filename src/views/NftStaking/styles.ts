import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'

export const ManageLayout = styled(FlexLayout)`
  .manage {
    max-width: 64.5%;
  }

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .manage-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .manage-footer {
    display: flex;
    justify-content: center;
    align-items: center;

    .manage-btn {
      margin: 0 5px 0 0;
    }
  }
`

export const NftWrapper = styled.div``
