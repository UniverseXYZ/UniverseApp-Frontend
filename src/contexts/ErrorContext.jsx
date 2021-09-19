import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const ErrorContext = createContext(null);

const ErrorContextProvider = ({ children }) => {
  const [showError, setShowError] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorBody, setErrorBody] = useState('');

  const closeError = () => {
    setShowError(false);
    setErrorTitle('');
    setErrorBody('');
  };
  return (
    <ErrorContext.Provider
      value={{
        showError,
        errorTitle,
        errorBody,
        closeError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

ErrorContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useErrorContext = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useErrorContext was used outside of its Provider');
  }

  return context;
};

export { ErrorContextProvider, useErrorContext };
