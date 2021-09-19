import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

ReactDOM.render(
  <BrowserRouter
    getUserConfirmation={() => {
      /* Empty callback to block the default browser prompt */
    }}
  >
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
