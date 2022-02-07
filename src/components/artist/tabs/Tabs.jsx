import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NFTsTab from './nfts/NFTsTab.jsx';
import tabArrow from '../../../assets/images/tab-arrow.svg';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import PastAuctionsTab from './pastAuctions/PastAuctionsTab.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../../utils/scrollingHandlers';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext.jsx';

const Tabs = ({ username, artistAddress }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { userPageNftsCount, setUserPageNftsCount } = useMyNftsContext();

  useEffect(() => setUserPageNftsCount(0), []);
  const scrollContainer = useRef();
  const scrollToTop = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  return (
    <div className="tabs__section">
      <div className="tabs__section__container">
        <div className="tabs__wrapper">
          {/* <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab left arrow"
            />
          </div> */}
          <div className="tabs" ref={scrollContainer}>
            <div className="tab_items">
              <button
                type="button"
                onClick={() => setSelectedTabIndex(0)}
                className={selectedTabIndex === 0 ? 'active' : ''}
              >
                NFTs
                <span>{userPageNftsCount}</span>
              </button>
              {/* <button
                type="button"
                onClick={() => setSelectedTabIndex(1)}
                className={selectedTabIndex === 1 ? 'active' : ''}
              >
                Active auctions
                <span>1111</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                Future auctions
                <span>22</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                Past auctions
                <span>178</span>
              </button> */}
            </div>
          </div>
          {/* <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              aria-hidden="true"
              src={tabArrow}
              alt="Tab right arrow"
            />
          </div> */}
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 && (
            <NFTsTab
              showMintPrompt={false}
              username={username}
              artistAddress={artistAddress}
              scrollToTop={scrollToTop}
            />
          )}
          {selectedTabIndex === 1 && <ActiveAuctionsTab showMintPrompt={false} />}
          {selectedTabIndex === 2 && <FutureAuctionsTab showMintPrompt={false} />}
          {selectedTabIndex === 3 && <PastAuctionsTab showMintPrompt={false} />}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  username: PropTypes.string.isRequired,
  artistAddress: PropTypes.string.isRequired,
};

export default Tabs;
