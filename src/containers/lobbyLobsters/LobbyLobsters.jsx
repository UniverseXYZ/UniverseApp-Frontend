import React, { useEffect, useRef } from 'react';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';
import Donate from '../../components/lobbyLobsters/donate/Donate';
import SliderSection from '../../components/lobbyLobsters/sliderSection/SliderSection';
import MintLobbyLobsterSection from '../../components/lobbyLobsters/mintSection/MintLobbyLobsterSection';
import { useThemeStore } from 'src/stores/themeStore';

const LobbyLobsters = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const myRef = useRef(null);
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="lobby--lobsters--page">
      <HeroSection ref={myRef} />
      <HelpUsBeHeard />
      <Donate />
      <SliderSection />
      {/* <MintLobbyLobsterSection ref={myRef} /> */}
    </div>
  );
};

export default LobbyLobsters;
