import React, { useContext } from 'react';
import './HeroSection.scss';
import { useHistory } from 'react-router-dom';
import FloatingNFTsAnimation from './animations/FloatingNFTsAnimation';
import EndlessWaveAnimation from './animations/EndlessWaveAnimation';
import AppContext from '../../../ContextAPI';
import { useLobsterContext } from '../../../contexts/LobsterContext';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';

const HeroSection = React.forwardRef((props, ref) => {
  const { navigateToMyUniverseNFTsTab, lobstersFilter } = useMyNftsContext();

  return (
    <div className="lobby--lobsters--hero--section">
      <div className="wave--img">
        <EndlessWaveAnimation />
      </div>
      <div className="hero--img">
        <FloatingNFTsAnimation />
      </div>
      <div className="lobby--lobsters--hero--section--container">
        <div className="left--section">
          <h1>Lobby Lobsters</h1>
          <p>They wear suits, so we don&#39;t have to.</p>
          <button
            type="button"
            onClick={() => {
              navigateToMyUniverseNFTsTab(lobstersFilter);
            }}
          >
            My Lobby Lobsters
          </button>
        </div>
      </div>
    </div>
  );
});

export default HeroSection;
