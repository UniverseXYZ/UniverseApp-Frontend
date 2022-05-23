import { OpenGraph } from '@app/components';
import OpenGraphImage from '@assets/images/open-graph/lobby-lobster.png';
import React, { useEffect, useRef } from 'react';
import { useThemeStore } from 'src/stores/themeStore';
import Donate from '../../components/lobbyLobsters/donate/Donate';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import SliderSection from '../../components/lobbyLobsters/sliderSection/SliderSection';

const METADATA = {
  title: 'Lobby Lobsters NFT Drop | Universe',
  description:
    "Universe Lobby Lobsters NFTs aim to support DeFi lobbying efforts. They wear suits, so we don't have to.",
};

const LobbyLobsters = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const myRef = useRef(null);
  useEffect(() => {
    setDarkMode(false);
  }, []);

  const schema = {
    "@context": "http://schema.org",
    "@type": "LobbyLobstersPage",
    name: METADATA.title,
    description:
      METADATA.description,
  };

  return (
    <div className="lobby--lobsters--page">
      <OpenGraph
        title={METADATA.title}
        description={METADATA.description}
        image={OpenGraphImage}
      />
      <HeroSection ref={myRef} />
      <HelpUsBeHeard />
      <Donate />
      <SliderSection />
      {/* <MintLobbyLobsterSection ref={myRef} /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
    </div>
  );
};

export default LobbyLobsters;
