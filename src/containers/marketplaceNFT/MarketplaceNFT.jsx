import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './MarketplaceNFT.scss';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import MarketplaceNFTDetails from '../../components/marketplaceNFT/MarketplaceNFTDetails';

const MarketplaceNFT = () => {
  const { setDarkMode } = useContext(AppContext);
  const location = useLocation();
  //   const selectedNFT = location.state ? location.state.nft : null;
  const selectedNFT = true;

  useEffect(() => {
    setDarkMode(false);
  });

  return selectedNFT ? (
    <div className="marketplace--nft--page1">
      <MarketplaceNFTDetails />
    </div>
  ) : (
    <NotFound />
  );
};

export default MarketplaceNFT;
