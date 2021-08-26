import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './LobbyLobsters.scss';
import HeroSection from '../../components/lobbyLobsters/heroSection/HeroSection';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import AppContext from '../../ContextAPI';
import heroSectionImage from '../../assets/images/lobby-lobsters/floating-nfts.png';
import HelpUsBeHeard from '../../components/lobbyLobsters/helpUs/HelpUsBeHeard';

const LobbyLobsters = () => {
  const { setDarkMode } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <div className="lobby--lobsters--page">
      <WelcomeWrapper
        title="Lobby Lobsters"
        hintText="They wear the suits for us so we dont have too"
        btnText="Mint Lobby Lobster"
        btnOnClick={() => history.push('/my-nfts')}
        ellipsesLeft={false}
        ellipsesRight={false}
      >
        <img src={heroSectionImage} alt="Hero" />
      </WelcomeWrapper>
      {/* <HeroSection /> */}
      <HelpUsBeHeard />
    </div>
  );
};

export default LobbyLobsters;
