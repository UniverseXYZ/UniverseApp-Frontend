import React, { useContext, useEffect } from 'react';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import AppContext from '../../ContextAPI';

const LobbyLobsters = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="lobby--lobsters--page">
      <HeroSection />
    </div>
  );
};

export default LobbyLobsters;
