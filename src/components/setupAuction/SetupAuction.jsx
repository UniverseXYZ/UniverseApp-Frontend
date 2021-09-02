/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import AuctionSettings from '../auctions/Settings';
import RewardTiers from '../rewardTiers/RewardTiers';
import ReviewAuction from '../auctions/AuctionReview';
import './SetupAuction.scss';
import arrow from '../../assets/images/arrow.svg';
import SettingIconActive from '../../assets/images/settings-solid.svg';
import SettingIcon from '../../assets/images/setting-solid-disactive.svg';
import RewardIconActive from '../../assets/images/ion_layers.svg';
import RewardIcon from '../../assets/images/ion_layers-disactive.svg';
import ReviewIcon from '../../assets/images/eye-review.svg';
import ReviewIconActive from '../../assets/images/eye-review-disactive.svg';
import NewTabs from '../tabs/NewTabs';
import AppContext from '../../ContextAPI';
import { RouterPrompt } from '../../utils/routerPrompt';

const newTabData = [
  {
    labelText: 'Auction settings',
    icon: SettingIcon,
    iconActive: SettingIconActive,
    route: '/setup-auction/auction-settings',
    home: true,
    content: <AuctionSettings />,
  },
  {
    labelText: 'Reward tiers',
    icon: RewardIcon,
    iconActive: RewardIconActive,
    route: '/setup-auction/reward-tiers',
    home: false,
    content: <RewardTiers />,
  },
  {
    labelText: 'Review auction',
    icon: ReviewIcon,
    iconActive: ReviewIconActive,
    route: '/setup-auction/review-auction',
    home: false,
    content: <ReviewAuction />,
  },
];

const SetupAuction = () => {
  const { auction, auctionSetupState } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === '/setup-auction/auction-settings') {
      setSelectedTabIndex(0);
    } else if (location.pathname === '/setup-auction/reward-tiers') {
      setSelectedTabIndex(1);
    } else {
      setSelectedTabIndex(2);
    }
  }, [location]);

  useEffect(() => {
    setShowPrompt(true);
  }, [location.pathname]);

  return (
    <div className="auction-setup">
      <RouterPrompt when={showPrompt} onOK={() => true} editing={auctionSetupState} />
      <div className="setup--auction--welcome--section">
        <div className="setup">
          <div
            className="back-rew"
            aria-hidden="true"
            onClick={() => {
              history.push('/my-auctions');
            }}
          >
            <img src={arrow} alt="back" />
            <span>My auctions</span>
          </div>
          <h1 className="set-text">Set up auction</h1>
        </div>
      </div>
      <div className="setup--auction--content">
        <NewTabs tabData={newTabData} />
      </div>
      {/* <div className="tabs__section">
        <div className="tabs container">
          <div className="tabs__wrapper">
            <div className="tabs">
              <div className="tab_items">
                <div
                  id="tabsdiv"
                  onClick={() =>
                    history.push('/setup-auction/auction-settings', auction && auction.id)
                  }
                  className={selectedTabIndex === 0 ? 'active' : ''}
                >
                  <span className="first-triangle" />
                  <button type="button">
                    <img
                      src={selectedTabIndex === 0 ? SettingIconActive : SettingIcon}
                      alt="setting-icon"
                    />
                    Auction settings
                  </button>
                  <span className="last-triangle" />
                </div>
                <div
                  id="tabsdiv"
                  onClick={() =>
                    auction.name &&
                    auction.startingBid &&
                    auction.startDate &&
                    auction.endDate &&
                    history.push('/setup-auction/reward-tiers')
                  }
                  className={`
                    ${selectedTabIndex === 1 ? 'active' : ''} 
                    ${
                      !auction.name ||
                      !auction.startingBid ||
                      !auction.startDate ||
                      !auction.endDate
                        ? 'disabled'
                        : ''
                    }
                  `}
                >
                  <span className="first-triangle" />
                  <button type="button">
                    <img
                      src={selectedTabIndex === 1 ? RewardIconActive : RewardIcon}
                      alt="reward-icon"
                    />
                    Reward tiers
                  </button>
                  <span className="last-triangle" />
                </div>
                <div
                  id="tabsdiv"
                  onClick={() =>
                    auction.name &&
                    auction.startingBid &&
                    auction.startDate &&
                    auction.endDate &&
                    auction.tiers.length &&
                    history.push('/setup-auction/review-auction')
                  }
                  className={`
                    ${selectedTabIndex === 2 ? 'active' : ''} 
                    ${
                      !auction.name ||
                      !auction.startingBid ||
                      !auction.startDate ||
                      !auction.endDate ||
                      !auction.tiers.length
                        ? 'disabled'
                        : ''
                    }
                  `}
                >
                  <span className="first-triangle" />
                  <button type="button">
                    <img
                      src={selectedTabIndex === 2 ? ReviewIconActive : ReviewIcon}
                      alt="review-icon"
                    />
                    Review auction
                  </button>
                  <span className="last-triangle third" />
                </div>
              </div>
            </div>
          </div>
          <div className="tab__content">
            <Switch>
              <Route
                exact
                path="/setup-auction/auction-settings"
                component={() => <AuctionSettings />}
              />
              <Route exact path="/setup-auction/reward-tiers" component={() => <RewardTiers />} />
              <Route
                exact
                path="/setup-auction/review-auction"
                component={() => <ReviewAuction />}
              />
              <Route path="*">
                <Redirect to="/setup-auction/auction-settings" />
              </Route>
            </Switch>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SetupAuction;
