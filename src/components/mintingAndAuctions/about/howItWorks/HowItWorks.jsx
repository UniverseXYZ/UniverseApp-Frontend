import { useState } from 'react';
import AuctionsTab from './AuctionsTab';
import MintingTab from './MintingTab';

const HowItWorks = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="how__it__works__section">
      <div className="how__it__works__section__container">
        <h1 className="title">How It Works</h1>
        <div className="tabs">
          <button
            onClick={() => setSelectedTabIndex(0)}
            className={selectedTabIndex === 0 ? 'active' : ''}
          >
            Minting
          </button>
          <button
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
