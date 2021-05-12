import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Modal, LinkExternal, Box, Text } from '@lydiafinance/uikit'
import BalanceInput from 'components/AvaxInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
// import ApproveConfirmButtons from 'views/Profile/components/ApproveConfirmButtons'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useERC20 } from 'hooks/useContract'

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onSuccess: (amount: BigNumber) => void
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss, onSuccess }) => {
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const raisingTokenContract = useERC20(currencyAddress)
  const balance = getBalanceNumber(useTokenBalance(currencyAddress))
  const { t } = useTranslation()
  const valueWithTokenDecimals = new BigNumber(value).times(new BigNumber(10).pow(18))
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await raisingTokenContract.methods.allowance(account, contract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return raisingTokenContract.methods
        .approve(contract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
    },
    onConfirm: () => {
      return contract.methods.deposit(valueWithTokenDecimals.toString()).send({ from: account })
    },
    onSuccess: async () => {
      onDismiss()
      onSuccess(valueWithTokenDecimals)
    },
  })

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <Box maxWidth="400px">
        <BalanceInput
          title={t('Contribute')}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          symbol={currency}
          max={balance}
          onSelectMax={() => setValue(balance.toString())}
          mb="24px"
        />
        <Text as="p" mb="24px">
          {t(
            "If you don't contribute enough LP tokens, you may not receive any IFO tokens at all and will only receive a full refund of your LP tokens.",
          )}
        </Text>

        <LinkExternal href="https://exchange.lydia.finance/#/add/AVAX/" style={{ margin: '16px auto 0' }}>
          {`Get ${currency}`}
        </LinkExternal>
      </Box>
    </Modal>
  )
}

export default ContributeModal
