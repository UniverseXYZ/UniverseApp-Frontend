import React, { useEffect, useContext } from 'react';
import MyAuctions from '../../components/auctions/MyAuction.jsx';
import AppContext from '../../ContextAPI';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import './Auctions.scss';

const Auctions = () => {
  const { setDarkMode } = useThemeContext();
  useEffect(() => {
    setDarkMode(false);
  }, []);
  return <MyAuctions />;
};

export default Auctions;
