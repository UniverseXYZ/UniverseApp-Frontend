import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const MarketplaceContext = createContext(null);

const MarketplaceContextProvider = ({ children }) => {
  const location = useLocation();

  const [stepsData, setStepsData] = useState({
    selectedItem: null,
    selectedMethod: null,
    settings: null,
    summary: null,
  });
  const [sellNFTSingleFixedListingData, setSellNFTSingleFixedListingData] = useState({
    startPrice: null,
    priceType: 'eth',
    switch: [],
    buyerAddress: null,
  });
  const [sellNFTBundleFixedListingData, setSellNFTBundleFixedListingData] = useState({
    startPrice: null,
    priceType: 'eth',
    bundleName: null,
    bundleDescription: null,
    switch: [],
    buyerAddress: null,
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
        sellNFTSingleFixedListingData,
        setSellNFTSingleFixedListingData,
        sellNFTBundleFixedListingData,
        setSellNFTBundleFixedListingData,
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
