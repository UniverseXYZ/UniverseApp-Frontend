import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const MarketplaceContext = createContext(null);

const MarketplaceContextProvider = ({ children }) => {
  const router = useRouter();

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
  const [sellNFTSingleDutchAuctionData, setSellNFTSingleDutchAuctionData] = useState({
    priceType: 'eth',
    startPrice: null,
    endPrice: null,
    switch: [],
    buyerAddress: null,
    endingPriceDate: '',
    scheduleDate: '',
  });
  const [sellNFTBundleDutchAuctionData, setSellNFTBundleDutchAuctionData] = useState({
    priceType: 'eth',
    startPrice: null,
    endPrice: null,
    switch: [],
    buyerAddress: null,
    endingPriceDate: '',
    scheduleDate: '',
    bundleName: null,
    bundleDescription: null,
  });
  const [sellNFTSingleEnglishAuctionData, setSellNFTSingleEnglishAuctionData] = useState({
    startPrice: null,
    endPrice: null,
    date: null,
    priceType: 'eth',
  });
  const [sellNFTBundleEnglishAuctionData, setSellNFTBundleEnglishAuctionData] = useState({
    startPrice: null,
    endPrice: null,
    date: null,
    priceType: 'eth',
    bundleName: null,
    bundleDescription: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      (router.asPath === '/nft-marketplace/settings' &&
        stepsData.selectedMethod === 'bundle') ||
      router.asPath === '/marketplace'
    ) {
      document.querySelector('header').style.position = 'absolute';
    } else {
      document.querySelector('header').style.position = 'fixed';
    }
  }, [router.asPath]);

  return (
    <MarketplaceContext.Provider
      value={{
        stepsData,
        setStepsData,
        sellNFTSingleFixedListingData,
        setSellNFTSingleFixedListingData,
        sellNFTBundleFixedListingData,
        setSellNFTBundleFixedListingData,
        sellNFTSingleDutchAuctionData,
        setSellNFTSingleDutchAuctionData,
        sellNFTBundleDutchAuctionData,
        setSellNFTBundleDutchAuctionData,
        sellNFTSingleEnglishAuctionData,
        setSellNFTSingleEnglishAuctionData,
        sellNFTBundleEnglishAuctionData,
        setSellNFTBundleEnglishAuctionData,
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
