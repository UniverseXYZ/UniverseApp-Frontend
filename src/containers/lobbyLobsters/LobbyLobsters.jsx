import React, { useContext, useEffect, useRef } from 'react';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import AppContext from '../../ContextAPI';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';
import Donate from '../../components/lobbyLobsters/donate/Donate';
import SliderSection from '../../components/lobbyLobsters/sliderSection/SliderSection';
import MintLobbyLobsterSection from '../../components/lobbyLobsters/mintSection/MintLobbyLobsterSection';

const LobbyLobsters = () => {
  const { setDarkMode } = useContext(AppContext);
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
      <MintLobbyLobsterSection ref={myRef} />
    </div>
  );
};

export default LobbyLobsters;
