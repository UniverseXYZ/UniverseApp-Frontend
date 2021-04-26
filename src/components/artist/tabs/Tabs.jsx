import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NFTsTab from './nfts/NFTsTab';
import tabArrow from '../../../assets/images/tab-arrow.svg';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab';
import PastAuctionsTab from './pastAuctions/PastAuctionsTab';

const Tabs = ({ onArtist }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabRightScrolling = () => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      document.querySelector('.tabs').scrollLeft += 10;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
        document.querySelector('.tab__left__arrow').style.display = 'flex';
        if (document.querySelector('.tabs').scrollLeft > 100) {
          document.querySelector('.tab__right__arrow').style.display = 'none';
        }
      }
    }, 25);
  };

  const handleTabLeftScrolling = () => {
    let scrollAmount = 100;
    const slideTimer = setInterval(() => {
      document.querySelector('.tabs').scrollLeft -= 10;
      scrollAmount -= 10;
      if (scrollAmount <= 0) {
        window.clearInterval(slideTimer);
        document.querySelector('.tab__right__arrow').style.display = 'flex';
        if (document.querySelector('.tabs').scrollLeft <= 0) {
          document.querySelector('.tab__left__arrow').style.display = 'none';
        }
      }
    }, 25);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 400) {
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
            <img onClick={handleTabLeftScrolling} src={tabArrow} alt="Tab left arrow" />
          </div>
          <div className="tabs">
            <div className="tab_items">
              <button
                onClick={() => setSelectedTabIndex(0)}
                className={selectedTabIndex === 0 ? 'active' : ''}
              >
                NFTs
              </button>
              <button
                onClick={() => setSelectedTabIndex(1)}
                className={selectedTabIndex === 1 ? 'active' : ''}
              >
                Active auctions
              </button>
              <button
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                Future auctions
              </button>
              <button
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                Past auctions
              </button>
            </div>
          </div>
          <div className="tab__right__arrow">
            <img onClick={handleTabRightScrolling} src={tabArrow} alt="Tab right arrow" />
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
  onArtist: PropTypes.object,
};

export default Tabs;
