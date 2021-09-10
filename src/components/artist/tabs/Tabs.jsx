import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NFTsTab from './nfts/NFTsTab.jsx';
import tabArrow from '../../../assets/images/tab-arrow.svg';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import PastAuctionsTab from './pastAuctions/PastAuctionsTab.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../../utils/scrollingHandlers';
import AppContext from '../../../ContextAPI.js';
import HiddenNFTs from '../../myNFTs/HiddenNFTs.jsx';
import LikedNFTs from '../../myNFTs/LikedNFTs.jsx';
import NFTsActivity from '../../myNFTs/NFTsActivity.jsx';

const Tabs = ({ onArtist }) => {
  const { myNFTs, myAuctions } = useContext(AppContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  console.log('myAuctions', myAuctions);
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

  useEffect(() => {
    if (!myNFTs.filter((nft) => nft.hidden).length) {
      setSelectedTabIndex(0);
    }
  }, [myNFTs]);

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
                {`NFTs ${
                  myNFTs.filter((item) => !item.hidden).length > 0
                    ? `(${myNFTs.filter((item) => !item.hidden).length})`
                    : ''
                }`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(1)}
                className={selectedTabIndex === 1 ? 'active' : ''}
              >
                {`Active auctions ${
                  myAuctions.filter(
                    (item) => item.launch && !moment(item.endDate).isBefore(moment.now())
                  ).length > 0
                    ? `(${
                        myAuctions.filter(
                          (item) => item.launch && !moment(item.endDate).isBefore(moment.now())
                        ).length
                      })`
                    : ''
                }`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(2)}
                className={selectedTabIndex === 2 ? 'active' : ''}
              >
                {`Future auctions ${
                  myAuctions.filter(
                    (item) => !item.launch && !moment(item.endDate).isBefore(moment.now())
                  ).length > 0
                    ? `(${
                        myAuctions.filter(
                          (item) => !item.launch && !moment(item.endDate).isBefore(moment.now())
                        ).length
                      })`
                    : ''
                }`}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(3)}
                className={selectedTabIndex === 3 ? 'active' : ''}
              >
                {`Past auctions ${
                  myAuctions.filter((item) => moment(item.endDate).isBefore(moment.now())).length >
                  0
                    ? `(${
                        myAuctions.filter((item) => moment(item.endDate).isBefore(moment.now()))
                          .length
                      })`
                    : ''
                }`}
              </button>
              {myNFTs.filter((nft) => nft.hidden).length ? (
                <button
                  type="button"
                  onClick={() => setSelectedTabIndex(4)}
                  className={selectedTabIndex === 4 ? 'active' : ''}
                >
                  {`Hidden ${
                    myNFTs.filter((item) => item.hidden).length > 0
                      ? `(${myNFTs.filter((item) => item.hidden).length})`
                      : ''
                  }`}
                </button>
              ) : (
                <></>
              )}
              {myNFTs.filter((nft) => nft.likers.length).length ? (
                <button
                  type="button"
                  onClick={() => setSelectedTabIndex(5)}
                  className={selectedTabIndex === 5 ? 'active' : ''}
                >
                  {`Liked ${
                    myNFTs.filter((item) => item.likers.length).length > 0
                      ? `(${myNFTs.filter((item) => item.likers.length).length})`
                      : ''
                  }`}
                </button>
              ) : (
                <></>
              )}
              <button
                type="button"
                onClick={() => setSelectedTabIndex(6)}
                className={selectedTabIndex === 6 ? 'active' : ''}
              >
                Activity
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
          {selectedTabIndex === 1 && <ActiveAuctionsTab onArtist={onArtist} />}
          {selectedTabIndex === 2 && <FutureAuctionsTab onArtist={onArtist} />}
          {selectedTabIndex === 3 && <PastAuctionsTab onArtist={onArtist} />}
          {selectedTabIndex === 4 && <HiddenNFTs />}
          {selectedTabIndex === 5 && <LikedNFTs />}
          {selectedTabIndex === 6 && <NFTsActivity />}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Tabs;
