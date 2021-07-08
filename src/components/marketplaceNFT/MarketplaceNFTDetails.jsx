import React, { useState } from 'react';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import cover from '../../assets/images/Rectangle 40198.png';
import heart from '../../assets/images/heart.svg';
import share from '../../assets/images/share.svg';
import avatar from '../../assets/images/avatarrr.svg';
import avatar1 from '../../assets/images/collection_img (2).svg';
import avatar2 from '../../assets/images/collection_img.svg';
import Button from '../button/Button.jsx';
import Properties from '../marketplaceTabComponents/Properties';
import Owners from '../marketplaceTabComponents/Owners';
import Bids from '../marketplaceTabComponents/Bids';
import TradingHistory from '../marketplaceTabComponents/TradingHistory';
import SharePopup from '../popups/SharePopup';
import Offers from '../marketplaceTabComponents/Offers';

const MarketplaceNFTDetails = () => {
  const tabs = ['Properties', 'Owners', 'Bids', 'Offers', 'History'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <>
      <div className="Marketplace--img">
        <img src={cover} alt="cover" />
      </div>
      <div className="Marketplace--settings">
        <div className="Marketplace--name">
          <h1>NFT long name</h1>
          <div className="icon">
            <img src={heart} alt="heartcover" />
            <p>120</p>
            <Popup trigger={<img src={share} alt="fsk" className="share-open" />}>
              {(close) => (
                <SharePopup
                  close={close}
                  // handleConnectWallet={handleConnectWallet}
                  // showInstallWalletPopup={showInstallWalletPopup}
                  // setShowInstallWalletPopup={setShowInstallWalletPopup}
                  // selectedWallet={selectedWallet}
                  // setSelectedWallet={setSelectedWallet}
                />
              )}
            </Popup>
          </div>
        </div>
        <div className="Marketplace--number">
          <p>1/20</p>
        </div>
        <div className="Marketplace--collections">
          <div className="Marketplace--creators">
            <img src={avatar} alt="icon" />
            <div className="creator--name">
              <p>Creator</p>
              <h6>Name</h6>
            </div>
          </div>
          <div className="Marketplace--creators">
            <img src={avatar1} alt="icon1" />
            <div className="creator--name">
              <p>Collection</p>
              <h6>Name</h6>
            </div>
          </div>
          <div className="Marketplace--creators">
            <img src={avatar2} alt="icon2" />
            <div className="creator--name">
              <p>Owner</p>
              <h6>Name</h6>
            </div>
          </div>
        </div>
        <div className="Marketplace--text">
          <p>
            Cras vel eget vitae quis scelerisque arcu ut. Tristique velit nec sed sit massa. Odio
            molestie velit purus at blandit. Lacus, fusce quam dolor imperdiet velit augue neque
            tincidunt lorem et diam... <span>Read more</span>
          </p>
        </div>
        <div className="Marketplace--info">
          <div className="Marketplace--bid">
            <p>
              Highest bid by <span>Name</span>
            </p>
            <h1>0.06 WETH</h1>
            <h2>$208.39</h2>
          </div>
          <div className="Marketplace--timer">
            <p>Sale ends in:</p>
            <div className="timer--value">
              <p>2</p>
              <p>8</p>
              <p>10</p>
              <p>15</p>
            </div>
            <div className="timer">
              <h1>Days</h1>
              <h2>Hours</h2>
              <h3>Minutes</h3>
              <h4>Seconds</h4>
            </div>
          </div>
        </div>
        <div className="Marketplace--buttons">
          <Button className="light-button">Place a bid</Button>
        </div>
        <div className="Marketplace--buttons">
          <Button className="grey-button">10% of sales will go to creator</Button>
        </div>
        <div className="tabs">
          <ul className="tab_items">
            {tabs.map((tab, index) => (
              <li
                key={uuid()}
                className={selectedTabIndex === index ? 'active' : ''}
                aria-hidden="true"
                onClick={() => setSelectedTabIndex(index)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedTabIndex === 0 && <Properties />}
          {selectedTabIndex === 1 && <Owners />}
          {selectedTabIndex === 2 && <Bids />}
          {selectedTabIndex === 3 && <Offers />}
          {selectedTabIndex === 4 && <TradingHistory />}
        </div>
      </div>
    </>
  );
};

export default MarketplaceNFTDetails;
