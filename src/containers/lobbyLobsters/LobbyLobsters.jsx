import React, { useContext, useEffect } from 'react';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import AppContext from '../../ContextAPI';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';
import SliderSection from '../../components/lobbyLobsters/sliderSection/SliderSection';

const LobbyLobsters = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="lobby--lobsters--page">
      <HeroSection />
      <HelpUsBeHeard />
      <SliderSection />
    </div>
  );
};

export default LobbyLobsters;
