import React, { useEffect, useContext } from 'react';
import MyNFTs from '../../components/myNFTs/MyNFTs';
import AppContext from '../../ContextAPI';
import './MyNFTs.scss';

const myNFTs = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(false);
  }, []);
  return <MyNFTs />;
};

export default myNFTs;
