import React from 'react';
import './HeroSection.scss';
import waveImage from '../../../assets/images/lobby-lobsters/moving-wave.png';
import FloatingNFTsAnimation from './animations/FloatingNFTsAnimation';
import EndlessWaveAnimation from './animations/EndlessWaveAnimation';

const HeroSection = () => (
  <div className="lobby--lobsters--hero--section">
    <div className="wave--img">
      <EndlessWaveAnimation />
      {/* <img src={waveImage} alt="Wave" /> */}
    </div>
    <div className="hero--img">
      <FloatingNFTsAnimation />
    </div>
    <div className="lobby--lobsters--hero--section--container">
      <div className="left--section">
        <h1>Lobby Lobsters</h1>
        <p>They wear the suits for us so we dont have too</p>
        <button type="button">Mint Lobby Lobster</button>
      </div>
    </div>
  </div>
);

export default HeroSection;
