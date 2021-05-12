import React from 'react'
import { ModalProvider } from '@lydiafinance/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import store from './src/state'
import { getLibrary } from './src/utils/web3React'
import { LanguageProvider } from './src/contexts/Localization'
import { ThemeContextProvider } from './src/contexts/ThemeContext'
import { RefreshContextProvider } from './src/contexts/RefreshContext'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeContextProvider>
          <LanguageProvider>
            <RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </RefreshContextProvider>
          </LanguageProvider>
        </ThemeContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
