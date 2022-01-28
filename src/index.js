import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SocketContextProvider } from './contexts/SocketContext';
import { ErrorContextProvider } from './contexts/ErrorContext';

ReactDOM.render(
  <BrowserRouter
    getUserConfirmation={() => {
      /* Empty callback to block the default browser prompt */
    }}
  >
    <ErrorContextProvider>
      <SocketContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </AuthContextProvider>
      </SocketContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
