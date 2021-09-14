import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NFTsTab from './nfts/NFTsTab.jsx';
import tabArrow from '../../../assets/images/tab-arrow.svg';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import PastAuctionsTab from './pastAuctions/PastAuctionsTab.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../../utils/scrollingHandlers';

const Tabs = ({ onArtist }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        document.querySelector('.tab__right__arrow').style.display = 'flex';
      } else {
        document.querySelector('.tab__right__arrow').style.display = 'none';
        document.querySelector('.tab__left__arrow').style.display = 'none';
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="tabs__section">
      <div className="tabs__section__container">
        <div className="tabs__wrapper">
          <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab left arrow"
            />
          </div>
          <div className="tabs">
            <div className="tab_items">
              <button
                type="button"
                onClick={() => setSelectedTabIndex(0)}
                className={selectedTabIndex === 0 ? 'active' : ''}
              >
                NFTs
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(1)}
                className={selectedTabIndex === 1 ? 'active' : ''}
              >
                Active auctions
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                Future auctions
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                Past auctions
              </button>
            </div>
          </div>
          <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab right arrow"
            />
          </div>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 && <NFTsTab onArtist={onArtist} />}
          {selectedTabIndex === 1 && <ActiveAuctionsTab />}
          {selectedTabIndex === 2 && <FutureAuctionsTab />}
          {selectedTabIndex === 3 && <PastAuctionsTab />}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Tabs;
