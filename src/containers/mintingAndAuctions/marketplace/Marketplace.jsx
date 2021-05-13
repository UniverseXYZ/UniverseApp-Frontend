import React, { useEffect, useContext } from 'react';
import './Marketplace.scss';
import CreateYourAuction from '../../../components/mintingAndAuctions/marketplace/tabs/CreateYourAuction';
import Tabs from '../../../components/mintingAndAuctions/marketplace/tabs/Tabs';
import Welcome from '../../../components/mintingAndAuctions/marketplace/Welcome';
import AppContext from '../../../ContextAPI';

const Marketplace = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(true);
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
