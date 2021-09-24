import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ErrorContextProvider } from './contexts/ErrorContext';

ReactDOM.render(
  <BrowserRouter
    getUserConfirmation={() => {
      /* Empty callback to block the default browser prompt */
    }}
  >
    <ErrorContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
