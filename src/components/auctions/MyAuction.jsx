import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import { Helmet } from 'react-helmet';
import Popup from 'reactjs-popup';
import FutureAuctions from './FutureAuctions.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import MyBidsList from '../auctionsCard/myBids/MyBidsList.jsx';
import plusIcon from '../../assets/images/plus.svg';
import PastAuctions from './PastAuctions';
import circle from '../../assets/images/green-circle.svg';
import LoadingPopup from '../popups/LoadingPopup';

const MyAuction = () => {
  const { myAuctions, setMyAuctions, setAuction, selectedTabIndex, setSelectedTabIndex, auction } =
    useAuctionContext();
  const { loggedInArtist } = useAuthContext();
  const [myBids, setMyBids] = useState([]);
  const defaultLoadingText =
    'The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress.';
  const [loadingText, setLoadingText] = useState(defaultLoadingText);

  const tabTitles = ['My bids', 'Active auctions', 'Draft auctions', 'Past auctions'];
  const tabs = { MyBids: 0, ActiveAuctions: 1, FutureAuctions: 2, PastAuctions: 3 };

  const [showButton, setShowButton] = useState(true);
  const [greenCircle, setgreenCircle] = useState(true);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
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
    <div className="auction__page">
      <Helmet>
        <title>Universe Minting - My Auctions</title>
      </Helmet>
      <div className="auction-head">
        <div className="container auction__page__header">
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
                <img src={plusIcon} alt="set up" />
              </button>
            </div>
          )}
        </div>
        <div className="container tabs__wrapper">
          <ul className="tabs">
            {tabTitles.map((title, index) => (
              <li
                key={uuid()}
                className={selectedTabIndex === index ? 'active' : ''}
                onClick={() => setSelectedTabIndex(index)}
                aria-hidden="true"
              >
                {title}
                {/* {index === 3 && greenCircle && (
                  <img src={circle} alt="notification-circle" className="notification-circle" />
                )} */}
                <span>
                  {title === 'My bids'
                    ? myBids.length
                    : title === 'Active auctions'
                    ? myAuctions.filter(
                        (item) =>
                          item.launch && isBeforeNow(item.startDate) && isAfterNow(item.endDate)
                      ).length
                    : title === 'Draft auctions'
                    ? myAuctions.filter((item) => !item.launch).length
                    : myAuctions.filter((item) => item.launch && isBeforeNow(item.endDate)).length}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container">
        {selectedTabIndex === tabs.MyBids && <MyBidsList myBids={myBids} setMyBids={setMyBids} />}

        {selectedTabIndex === tabs.ActiveAuctions && <ActiveAuctions />}

        {selectedTabIndex === tabs.FutureAuctions && <FutureAuctions setAuction={setAuction} />}

        {selectedTabIndex === tabs.PastAuctions && (
          <PastAuctions setShowLoadingModal={setShowLoadingModal} setLoadingText={setLoadingText} />
        )}
      </div>

      <Popup open={showLoadingModal} closeOnDocumentClick={false}>
        <LoadingPopup
          text={loadingText}
          onClose={() => setShowLoadingModal(false)}
          contractInteraction
        />
      </Popup>
    </div>
  );
};
export default MyAuction;
