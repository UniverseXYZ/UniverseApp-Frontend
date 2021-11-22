import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import moment from 'moment';
import Exclamation from '../../assets/images/Exclamation.svg';
import tabArrow from '../../assets/images/tab-arrow.svg';
import bubleIcon from '../../assets/images/text-bubble.png';
import FutureAuctions from './FutureAuctions.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import PastAuctions from './PastAuctions.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useWindowSize } from 'react-use';

const MyAuction = () => {
  const { myAuctions, setMyAuctions, setAuction, selectedTabIndex, setSelectedTabIndex } =
    useAuctionContext();
  const { loggedInArtist } = useAuthContext();

  const tabTitles = ['Active auctions', 'Future auctions', 'Past auctions'];
  const tabs = { ActiveAuctions: 0, FutureAuctions: 1, PastAuctions: 2 };

  const [showButton, setShowButton] = useState(true);
  const history = useHistory();
  const windowSize = useWindowSize();

  useEffect(() => {
    document.title = 'Universe Minting - My Auctions';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    if (document && windowSize.width < 500) {
      document.querySelector('.tab__right__arrow').style.display = 'flex';
    } else {
      document.querySelector('.tab__right__arrow').style.display = 'none';
      document.querySelector('.tab__left__arrow').style.display = 'none';
    }
  }, [windowSize]);

  useEffect(() => {
    if (windowSize.width < 576) {
      if (
        selectedTabIndex === tabs.ActiveAuctions &&
        !myAuctions.filter((item) => item.launch).length
      ) {
        setShowButton(false);
      } else if (
        selectedTabIndex === tabs.FutureAuctions &&
        !myAuctions.filter(
          (item) =>
            !item.launch &&
            !moment(item.endDate).isBefore(moment.now()) &&
            !(
              moment(item.endDate).isAfter(moment.now()) &&
              (moment(item.endDate).diff(moment(item.startDate)) > 0 &&
                moment(item.startDate).isBefore(moment.now())) > 0
            )
        ).length
      ) {
        setShowButton(false);
      } else if (
        selectedTabIndex === tabs.PastAuctions &&
        !myAuctions.filter((item) => moment(item.endDate).isBefore(moment.now())).length
      ) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    } else {
      setShowButton(true);
    }
  }, [selectedTabIndex, windowSize]);

  return (
    <div className="container auction__page">
      <div className="auction__page__header">
        <h1 className="title">My auctions</h1>
        {showButton && (
          <div>
            <button
              type="button"
              className="light-button set_up"
              onClick={() =>
                loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
              }
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
        <div style={{ display: 'none' }} className="err-msg">
          <img src={Exclamation} alt="message" />
          <p>
            Please, fill out the profile details before you set up an auction.
            <span> Go to my profile.</span>
          </p>
        </div>
        {selectedTabIndex === tabs.ActiveAuctions &&
        myAuctions.filter(
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
          <></>
        )}
        {selectedTabIndex === tabs.ActiveAuctions &&
        !myAuctions.filter(
          (item) =>
            item.launch &&
            moment(item.startDate).isBefore(moment.now()) &&
            !moment(item.endDate).isBefore(moment.now())
        ).length ? (
          <div className="empty__auction">
            <img src={bubleIcon} alt="Buble" />
            <h3>No active auctions found</h3>
            {!loggedInArtist.name || !loggedInArtist.avatar ? (
              <div className="warning__div">
                <img src={Exclamation} alt="Warning" />
                <p>
                  Please, fill out the profile details before you set up an auction.{' '}
                  <button type="button" onClick={() => history.push('/my-account')}>
                    Go to my profile
                  </button>
                  .
                </p>
              </div>
            ) : (
              <p className="desc">Create your first auction by clicking the button below</p>
            )}
            <button
              type="button"
              className="light-button set_up"
              onClick={() =>
                loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
              }
              disabled={!loggedInArtist.name || !loggedInArtist.avatar}
            >
              Set up auction
            </button>
          </div>
        ) : (
          <></>
        )}
        {selectedTabIndex === tabs.FutureAuctions &&
        myAuctions.filter((item) => !item.launch).length ? (
          <FutureAuctions
            myAuctions={myAuctions}
            setMyAuctions={setMyAuctions}
            setAuction={setAuction}
          />
        ) : (
          <></>
        )}
        {selectedTabIndex === tabs.FutureAuctions &&
        !myAuctions.filter((item) => !item.launch).length ? (
          <div className="empty__auction">
            <img src={bubleIcon} alt="Buble" />
            <h3>No scheduled auctions found</h3>
            {!loggedInArtist.name || !loggedInArtist.avatar ? (
              <div className="warning__div">
                <img src={Exclamation} alt="Warning" />
                <p>
                  Please, fill out the profile details before you set up an auction.{' '}
                  <button type="button" onClick={() => history.push('/my-account')}>
                    Go to my profile
                  </button>
                  .
                </p>
              </div>
            ) : (
              <p className="desc">Create your first auction by clicking the button below</p>
            )}
            <button
              type="button"
              className="light-button set_up"
              onClick={() =>
                loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
              }
              disabled={!loggedInArtist.name || !loggedInArtist.avatar}
            >
              Set up auction
            </button>
          </div>
        ) : (
          <></>
        )}

        {selectedTabIndex === tabs.PastAuctions &&
        myAuctions.filter((item) => item.launch && moment(item.endDate).isBefore(moment.now()))
          .length ? (
          <PastAuctions myAuctions={myAuctions} setMyAuctions={setMyAuctions} />
        ) : (
          <></>
        )}
        {selectedTabIndex === tabs.PastAuctions &&
        !myAuctions.filter((item) => item.launch && moment(item.endDate).isBefore(moment.now()))
          .length ? (
          <div className="empty__auction">
            <img src={bubleIcon} alt="Buble" />
            <h3>No past auctions found</h3>
            {!loggedInArtist.name || !loggedInArtist.avatar ? (
              <div className="warning__div">
                <img src={Exclamation} alt="Warning" />
                <p>
                  Please, fill out the profile details before you set up an auction.{' '}
                  <button type="button" onClick={() => history.push('/my-account')}>
                    Go to my profile
                  </button>
                  .
                </p>
              </div>
            ) : (
              <p className="desc">Create your first auction by clicking the button below</p>
            )}
            <button
              type="button"
              className="light-button set_up"
              onClick={() =>
                loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
              }
              disabled={!loggedInArtist.name || !loggedInArtist.avatar}
            >
              Set up auction
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default MyAuction;
