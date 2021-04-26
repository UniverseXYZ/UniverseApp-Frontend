import React, { useEffect } from 'react';
import About from '../../components/homepage/About';
import BuyUniverseNFTs from '../../components/homepage/BuyUniverseNFTs';
import './Homepage.scss';
import NonFungibleUniverse from '../../components/homepage/NonFungibleUniverse';
import Welcome from '../../components/homepage/Welcome';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
