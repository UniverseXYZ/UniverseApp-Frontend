import React, { useEffect } from 'react';
import './Marketplace.scss';
import CreateYourAuction from '../../../components/products/marketplace/tabs/CreateYourAuction.jsx';
import Tabs from '../../../components/products/marketplace/tabs/Tabs.jsx';
import Welcome from '../../../components/products/marketplace/Welcome.jsx';
import { useThemeContext } from '../../../contexts/ThemeContext';

const Marketplace = () => {
  const { setDarkMode } = useThemeContext();
  useEffect(() => {
    setDarkMode(true);
    document.title = 'Universe Minting - Minting & Auctions - Marketplace';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return (
    <div className="marketplace__page">
      <Welcome />
      <Tabs />
      <CreateYourAuction />
    </div>
  );
};

export default Marketplace;
