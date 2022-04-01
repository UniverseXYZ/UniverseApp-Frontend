import React, { useContext } from 'react';
// import './HeroSection.scss';
import { useHistory } from 'react-router-dom';
import FloatingNFTsAnimation from './animations/FloatingNFTsAnimation';
import EndlessWaveAnimation from './animations/EndlessWaveAnimation';
import AppContext from '../../../ContextAPI';
import { useRouter } from 'next/router';
import { useMyNftsStore } from 'src/stores/myNftsStore';

const HeroSection = React.forwardRef((props, ref) => {
  const { navigateToMyUniverseNFTsTab, lobstersFilter } = useMyNftsStore(s => ({navigateToMyUniverseNFTsTab: s.navigateToMyUniverseNFTsTab, lobstersFilter: s.lobstersFilter}))
  const router = useRouter();
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
              router.push('/my-nfts');
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
