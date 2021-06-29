import React, { useEffect, useContext } from 'react';
import './Marketplace.scss';
import CreateYourAuction from '../../../components/mintingAndAuctions/marketplace/tabs/CreateYourAuction.jsx';
import Tabs from '../../../components/mintingAndAuctions/marketplace/tabs/Tabs.jsx';
import Welcome from '../../../components/mintingAndAuctions/marketplace/Welcome.jsx';
import AppContext from '../../../ContextAPI';

const Marketplace = () => {
  const { setDarkMode } = useContext(AppContext);
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
