import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ErrorContextProvider } from './contexts/ErrorContext';
import { LoadingPopupContextProvider } from './app/providers/LoadingProvider';
import { NFTCheckoutContextProvider } from './app/providers/NFTCheckoutProvider';

ReactDOM.render(
  <BrowserRouter
    getUserConfirmation={() => {
      /* Empty callback to block the default browser prompt */
    }}
  >
    <LoadingPopupContextProvider>
      <NFTCheckoutContextProvider>
        <ErrorContextProvider>
          <AuthContextProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </AuthContextProvider>
        </ErrorContextProvider>
      </NFTCheckoutContextProvider>
    </LoadingPopupContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
