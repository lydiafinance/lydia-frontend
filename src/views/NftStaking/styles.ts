import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import PageHeader from 'components/PageHeader'
import { Flex } from '@lydiafinance/uikit'

export const ManageLayout = styled(FlexLayout)`
  .manage {
    max-width: 33%;
  }

  .button-card {
    max-width: 33%;
  }

  .nft-container-card {
    ${({ theme }) => theme.mediaQueries.xs} {
      max-width: 95%;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      max-width: 90%;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 85%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      max-width: 80%;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      max-width: 70%;
    }
  }

  .nft-grid {
    display: grid;
    ${({ theme }) => theme.mediaQueries.xs} {
      grid-template-columns: auto auto;
      padding: 0;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      grid-template-columns: auto auto auto;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: auto auto auto;
      padding: 24px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      grid-template-columns: auto auto auto auto;
    }
  }

  .nft-grid-item {
    display: flex;
    justify-content: center;
  }

  .nft-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 150px;
    margin: 10px;
    padding: 10px;
    border-style: solid !important;
    border-color: grey !important;
    border-radius: 20px !important;
    border: 1px;
    .nft-image {
      display: flex;
      width: 120px;
      justify-content: center;

      .nft-approved {
        cursor: pointer;
        border-radius: 20px;
      }
      .nft-unapproved {
        border-radius: 20px;
        filter: grayscale(100%);
        cursor: not-allowed;
      }
    }
    .nft-details {
      display: flex !important;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 120px;
      padding: 5px;

      .nft-name {
        margin-bottom: 5px;
      }
    }
    img {
      display: block !important;
      width: 100px;
    }
  }

  .nft-checkbox {
    width: 20px;
    height: 20px;
  }

  .overview-body {
    display: grid;
    column-gap: 15px;
    row-gap: 15px;
    grid-template-columns: auto auto auto auto auto;
  }

  .overview-nft {
    cursor: pointer;
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

export const NftPageHeader = styled(PageHeader)`
  position: relative;
  display: block;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: none;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

export const BannerImageContainer = styled.div`
  top: 0;
  position: absolute;
  display: block;

  ${({ theme }) => theme.mediaQueries.xs} {
    display: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    left: 70px;
    width: 230px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
    left: 100px;
    width: 257px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    display: block;
    left: 200px;
    width: 257px;
  }
`

export const BannerTextContainer = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 200px;
  }
`
