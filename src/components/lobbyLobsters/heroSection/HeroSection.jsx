import React from 'react';
import './HeroSection.scss';
import waveImage from '../../../assets/images/lobby-lobsters/moving-wave.png';
import heroDesktopImage from '../../../assets/images/lobby-lobsters/floating-nfts.png';
import heroTabletImage from '../../../assets/images/lobby-lobsters/floating-nfts-tablet.png';

const HeroSection = () => (
  <div className="lobby--lobsters--hero--section">
    <div className="wave--img">
      <img src={waveImage} alt="Wave" />
    </div>
    <div className="hero--img">
      <img src={heroDesktopImage} alt="Hero" className="for--desktop" />
      <img src={heroTabletImage} alt="Hero" className="for--tablet" />
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
