import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const MarketplaceContext = createContext(null);

const MarketplaceContextProvider = ({ children }) => {
  const location = useLocation();

  const [stepsData, setStepsData] = useState({
    selectedMethod: null,
    settings: null,
    summary: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      (location.pathname === '/nft-marketplace/settings' &&
        stepsData.selectedMethod === 'bundle') ||
      location.pathname === '/marketplace'
    ) {
      document.querySelector('header').style.position = 'absolute';
    } else {
      document.querySelector('header').style.position = 'fixed';
    }
  }, [location]);

  return (
    <MarketplaceContext.Provider
      value={{
        stepsData,
        setStepsData,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

MarketplaceContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useMarketplaceContext = () => {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error('useMarketplaceContext was used outside of its Provider');
  }

  return context;
};

export { MarketplaceContextProvider, useMarketplaceContext };
