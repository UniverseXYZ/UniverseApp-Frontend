/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { RouterPrompt } from '../../utils/routerPrompt';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useThemeContext } from '../../contexts/ThemeContext';

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
  const { setDarkMode } = useThemeContext();
  // const { auctionSetupState } = useAuctionContext();
  const history = useHistory();
  const location = useLocation();

  const handleOK = useCallback(() => true, []);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="auction-setup">
      {/* // TODO:: The router prompt is causing rerenders, making the Settings.jsx to lose state Investigate */}
      {/* <RouterPrompt when onOK={handleOK} editing={auctionSetupState} /> */}
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
          <h1 className="set-text">
            {location.state === 'edit' ? 'Edit auction' : 'Set up auction'}
          </h1>
        </div>
      </div>
      <div className="setup--auction--content">
        <NewTabs tabData={newTabData} />
      </div>
    </div>
  );
};

export default SetupAuction;
