import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
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
  }, []);
  return (
    <div className="homepage">
      <Helmet>
        <title>Universe XYZ - The NFT Universe Built on Ethereum</title>
        <meta
          name="description"
          content="Launch your own community-driven NFT universe baked with social tools, media services, and distribution - underpinned by the native $XYZ token."
        />
      </Helmet>
      <Welcome />
      <About />
      <NonFungibleUniverse />
      <BuyUniverseNFTs />
    </div>
  );
};
export default Homepage;
