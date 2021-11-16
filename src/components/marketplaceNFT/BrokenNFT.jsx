import React from 'react';
import cogWheel from '../../assets/images/cog.png';
// import './BrokenNFT.scss';

const BrokenNFT = () => (
  <div className="wrap">
    <div id="broken-nft-container">
      <div>
        <img id="cog-img" src={cogWheel} alt="cogWheel" />
      </div>
      <div className="error-text">
        <span>This NFT can&apos;t load yet</span>
      </div>
      <div className="error-text">
        <span style={{ fontWeight: 400, fontSize: 12 }}>We&apos;re working on it</span>
      </div>
    </div>
  </div>
);

export default BrokenNFT;
