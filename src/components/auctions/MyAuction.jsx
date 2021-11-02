import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';
import tabArrow from '../../assets/images/tab-arrow.svg';
import FutureAuctions from './FutureAuctions.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { PLACEHOLDER_MY_BIDS } from '../../utils/fixtures/MyBidsDummyData';
import NoAuctionsFound from './NoAuctionsFound';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import MyBidsList from '../auctionsCard/myBids/MyBidsList.jsx';
import plusIcon from '../../assets/images/plus.svg';
import PastAuctions from './PastAuctions';

const MyAuction = () => {
  const { myAuctions, setMyAuctions, setAuction, selectedTabIndex, setSelectedTabIndex, auction } =
    useAuctionContext();
  const { loggedInArtist } = useAuthContext();

  const tabTitles = ['My bids', 'Active auctions', 'Future auctions', 'Past auctions'];
  const tabs = { MyBids: 0, ActiveAuctions: 1, FutureAuctions: 2, PastAuctions: 3 };

  const [showButton, setShowButton] = useState(true);
  const history = useHistory();

  useEffect(() => {
    function handleShowButton() {
      if (window.innerWidth < 576) {
        if (
          selectedTabIndex === tabs.ActiveAuctions &&
          !myAuctions.filter(
            (item) => item.launch && isBeforeNow(item.startDate) && isAfterNow(item.endDate)
          ).length
        ) {
          setShowButton(false);
        } else if (
          selectedTabIndex === tabs.FutureAuctions &&
          !myAuctions.filter((item) => !item.launch).length
        ) {
          setShowButton(false);
        } else if (
          selectedTabIndex === tabs.PastAuctions &&
          !myAuctions.filter((item) => item.launch && isBeforeNow(item.endDate)).length
        ) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      } else {
        setShowButton(true);
      }
    }
    window.addEventListener('resize', handleShowButton);
    handleShowButton();

    return () => window.removeEventListener('resize', handleShowButton);
  }, [selectedTabIndex]);

  return (
    <div className="container auction__page">
      <Helmet>
        <title>Universe Minting - My Auctions</title>
      </Helmet>
      <div className="auction__page__header">
        <h1 className="title">My auctions</h1>
        {showButton && (
          <div>
            <button
              type="button"
              className="light-button set_up"
              onClick={() => {
                setAuction({ rewardTiers: [] });
                return (
                  loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
                );
              }}
              disabled={!loggedInArtist.name || !loggedInArtist.avatar}
            >
              Set up auction
              <img src={plusIcon} alt="icon" style={{ marginLeft: '12px' }} />
            </button>
          </div>
        )}
      </div>

      <div className="auction__page__body">
        <div className="tabs__wrapper">
          <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              src={tabArrow}
              alt="Tab left arrow"
              aria-hidden="true"
            />
          </div>
          <ul className="tabs">
            {tabTitles.map((title, index) => (
              <li
                key={uuid()}
                className={selectedTabIndex === index ? 'active' : ''}
                onClick={() => setSelectedTabIndex(index)}
                aria-hidden="true"
              >
                {title}
              </li>
            ))}
          </ul>
          <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              src={tabArrow}
              alt="Tab right arrow"
              aria-hidden="true"
            />
          </div>
        </div>

        {selectedTabIndex === tabs.MyBids && <MyBidsList />}

        {selectedTabIndex === tabs.ActiveAuctions && <ActiveAuctions />}

        {selectedTabIndex === tabs.FutureAuctions && (
          <FutureAuctions
            myAuctions={myAuctions}
            setMyAuctions={setMyAuctions}
            setAuction={setAuction}
          />
        )}

        {selectedTabIndex === tabs.PastAuctions && <PastAuctions />}
      </div>
    </div>
  );
};
export default MyAuction;
