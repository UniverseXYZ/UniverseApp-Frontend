import React, { useEffect, useContext } from 'react';
import MyAuctions from '../../components/auctions/MyAuction.jsx';
import AppContext from '../../ContextAPI';
import './Auctions.scss';

const Auctions = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(false);
  }, []);
  return <MyAuctions />;
};

export default Auctions;
