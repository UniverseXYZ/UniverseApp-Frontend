import React, { useState } from 'react';
import AuctionsTab from './AuctionsTab.jsx';
import MintingTab from './MintingTab.jsx';
import question from '../../../../assets/images/howItWork/question.png';

const HowItWorks = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="how__it__works__section">
      <div className="how__it__works__section__container">
        <div className="image-section">
          <img src={question} alt="icon" />
        </div>
        <h1 className="title">How It Works</h1>
        <div className="tabs">
          <button
            type="button"
            onClick={() => setSelectedTabIndex(0)}
            className={selectedTabIndex === 0 ? 'active' : ''}
          >
            Minting
          </button>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(1)}
            className={selectedTabIndex === 1 ? 'active' : ''}
          >
            Auctions
          </button>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 ? <MintingTab /> : <AuctionsTab />}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
