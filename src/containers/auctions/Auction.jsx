import React, { useEffect, useContext } from 'react';
import MyAuctions from '../../components/auctions/MyAuction';
import AppContext from '../../ContextAPI';
import './Auctions.scss';

const Auctions = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(false);
  }, []);
  return <MyAuctions />;
};

export default Auctions;
