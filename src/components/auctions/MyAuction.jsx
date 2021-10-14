import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import moment from 'moment';
import tabArrow from '../../assets/images/tab-arrow.svg';
import FutureAuctions from './FutureAuctions.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import PastAuctions from './PastAuctions.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { PLACEHOLDER_MY_BIDS } from '../../utils/fixtures/MyBidsDummyData';
import MyBidsCard from '../auctionsCard/MyBidsCard';
import NoAuctionsFound from './NoAuctionsFound';

const MyAuction = () => {
  const { myAuctions, setMyAuctions, setAuction, selectedTabIndex, setSelectedTabIndex, auction } =
    useAuctionContext();
  const { loggedInArtist } = useAuthContext();

  const tabTitles = ['My bids', 'Active auctions', 'Future auctions', 'Past auctions'];
  const tabs = { MyBids: 0, ActiveAuctions: 1, FutureAuctions: 2, PastAuctions: 3 };

  const [showButton, setShowButton] = useState(true);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Universe Minting - My Auctions';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
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
    function handleShowButton() {
      if (window.innerWidth < 576) {
        if (
          selectedTabIndex === tabs.ActiveAuctions &&
          !myAuctions.filter(
            (item) =>
              item.launch &&
              moment(item.startDate).isBefore(moment.now()) &&
              !moment(item.endDate).isBefore(moment.now())
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
          !myAuctions.filter((item) => item.launch && moment(item.endDate).isBefore(moment.now()))
            .length
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

        {selectedTabIndex === tabs.MyBids && (
          <>
            {PLACEHOLDER_MY_BIDS.length ? (
              <MyBidsCard data={PLACEHOLDER_MY_BIDS} />
            ) : (
              <NoAuctionsFound
                title="No bids found"
                desc="Explore the auctions by clicking the button below"
                btnText="Auction house"
                btnAction="/minting-and-auctions/marketplace/active-auctions"
              />
            )}
          </>
        )}

        {selectedTabIndex === tabs.ActiveAuctions && (
          <>
            {myAuctions.filter(
              (item) =>
                item.launch &&
                moment(item.startDate).isBefore(moment.now()) &&
                !moment(item.endDate).isBefore(moment.now())
            ).length ? (
              <ActiveAuctions
                myAuctions={myAuctions}
                setMyAuctions={setMyAuctions}
                setAuction={setAuction}
              />
            ) : (
              <NoAuctionsFound title="No active auctions found" />
            )}
          </>
        )}

        {selectedTabIndex === tabs.FutureAuctions && (
          <>
            {myAuctions.filter((item) => !item.launch).length ? (
              <FutureAuctions
                myAuctions={myAuctions}
                setMyAuctions={setMyAuctions}
                setAuction={setAuction}
              />
            ) : (
              <NoAuctionsFound title="No scheduled auctions found" />
            )}
          </>
        )}

        {selectedTabIndex === tabs.PastAuctions && (
          <>
            {myAuctions.filter((item) => item.launch && moment(item.endDate).isBefore(moment.now()))
              .length ? (
              <PastAuctions myAuctions={myAuctions} setMyAuctions={setMyAuctions} />
            ) : (
              <NoAuctionsFound title="No past auctions found" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default MyAuction;
