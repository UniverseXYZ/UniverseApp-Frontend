import React, { useEffect, useContext } from 'react';
import MyAuctions from '../../components/auctions/MyAuction.jsx';
import AppContext from '../../ContextAPI';
import './Auctions.scss';

const Auctions = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    setWebsite(false);
  }, []);
  return <MyAuctions />;
};

export default Auctions;
