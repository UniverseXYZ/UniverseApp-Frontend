import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

interface ILoadingValue {
  showLoading: boolean,
  setShowLoading: (loading: boolean) => void,
  loadingTitle: string,
  setLoadingTitle: (title: string) => void,
  loadingBody: string,
  setLoadingBody: (body: string) => void,
  closeLoading: () => void,
  transactions: string[],
  setTransactions: (transactions: string[]) => void,
}

const LoadingPopupContext = createContext({} as ILoadingValue);

const DEFAULT_HEADING = 'Please wait for the transaction to compleete ...';
const DEFAULT_BODY = '';

interface ILoaderProviderProps {
  children: React.ReactNode;
}


const LoadingPopupContextProvider = (props: ILoaderProviderProps) => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [loadingTitle, setLoadingTitle] = useState<string>(DEFAULT_HEADING);
  const [loadingBody, setLoadingBody] = useState<string>(DEFAULT_BODY);
  const [transactions, setTransactions] = useState<string[]>([]);

  const closeLoading = () => {
    setShowLoading(false);
    setLoadingTitle(DEFAULT_HEADING);
    setLoadingBody(DEFAULT_BODY);
    setTransactions([]);
  };

  const value: ILoadingValue = {
    showLoading,
    setShowLoading,
    loadingTitle,
    setLoadingTitle,
    loadingBody,
    setLoadingBody,
    closeLoading,
    transactions,
    setTransactions,
  };

  return (
    <LoadingPopupContext.Provider value={value} {...props} />
  );
};

LoadingPopupContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useLoadingPopupContext = () => {
  const context = useContext(LoadingPopupContext);

  if (!context) {
    throw new Error('useLoadingPopupContext was used outside of its Provider');
  }

  return context;
};

export { LoadingPopupContextProvider, useLoadingPopupContext };
