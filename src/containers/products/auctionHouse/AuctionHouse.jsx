import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateYourAuction from '../../../components/products/auctionHouse/tabs/CreateYourAuction.jsx';
import Tabs from '../../../components/products/auctionHouse/tabs/Tabs.jsx';
import Welcome from '../../../components/products/auctionHouse/Welcome.jsx';
import { useThemeContext } from '../../../contexts/ThemeContext';

const AuctionHouse = () => {
  const { setDarkMode } = useThemeContext();
  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <div className="auction__house__page">
      <Helmet>
        <title>Universe Minting - Products - Auction House</title>
      </Helmet>
      <Welcome />
      <Tabs />
      <CreateYourAuction />
    </div>
  );
};

export default AuctionHouse;
