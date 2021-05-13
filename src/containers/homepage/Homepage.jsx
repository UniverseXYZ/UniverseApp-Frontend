import React, { useEffect, useContext } from 'react';
import About from '../../components/homepage/About';
import BuyUniverseNFTs from '../../components/homepage/BuyUniverseNFTs';
import './Homepage.scss';
import NonFungibleUniverse from '../../components/homepage/NonFungibleUniverse';
import Welcome from '../../components/homepage/Welcome';
import AppContext from '../../ContextAPI';

const Homepage = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(true);
    document.title = 'Universe Minting - Homepage';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return (
    <div className="homepage">
      <Welcome />
      <About />
      <NonFungibleUniverse />
      <BuyUniverseNFTs />
    </div>
  );
};

export default Homepage;
