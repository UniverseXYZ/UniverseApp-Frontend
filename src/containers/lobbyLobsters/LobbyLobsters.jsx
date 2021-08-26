import React, { useContext, useEffect } from 'react';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import AppContext from '../../ContextAPI';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';

const LobbyLobsters = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="lobby--lobsters--page">
      <HeroSection />
      <HelpUsBeHeard />
    </div>
  );
};

export default LobbyLobsters;
