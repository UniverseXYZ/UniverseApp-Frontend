import React, { useEffect } from 'react';

import OpenGraphImage from '@assets/images/open-graph/home-page.png'
import { OpenGraph } from '@app/components';

import { useThemeStore } from 'src/stores/themeStore';
import About from '../../components/homepage/About.jsx';
import BuyUniverseNFTs from '../../components/homepage/BuyUniverseNFTs.jsx';
import NonFungibleUniverse from '../../components/homepage/NonFungibleUniverse.jsx';
import Welcome from '../../components/homepage/Welcome.jsx';

const Homepage = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  useEffect(() => {
    setDarkMode(true);
  }, []);
  return (
    <div className="homepage">
      <OpenGraph
        title={'Universe – Community-Driven NFT Protocol'}
        titlePostfix={null}
        description={'Community-driven NFT Universe with the tools to empower artists and endless possibilities for creators.'}
        image={OpenGraphImage}
      >
        <title>Universe XYZ - The NFT Universe Built on Ethereum</title>
        <meta
          name="description"
          content="Launch your own community-driven NFT universe baked with social tools, media services, and distribution - underpinned by the native $XYZ token."
        />
      </OpenGraph>
      <Welcome />
      <About />
      <NonFungibleUniverse />
      <BuyUniverseNFTs />
    </div>
  );
};
export default Homepage;
