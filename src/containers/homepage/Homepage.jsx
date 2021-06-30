import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import About from '../../components/homepage/About.jsx';
import BuyUniverseNFTs from '../../components/homepage/BuyUniverseNFTs.jsx';
import './Homepage.scss';
import NonFungibleUniverse from '../../components/homepage/NonFungibleUniverse.jsx';
import Welcome from '../../components/homepage/Welcome.jsx';
import AppContext from '../../ContextAPI';

const Homepage = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(true);
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
