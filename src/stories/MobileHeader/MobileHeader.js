import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Button from '../Button/Button';
import './MobileHeader.scss';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import hamburgerIcon from '../../assets/images/hamburger.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import accountIcon from '../../assets/images/icon1.svg';
import accountDarkIcon from '../../assets/images/account-dark-icon.svg';
import Group2 from '../../assets/images/Group2.svg';
import Group1 from '../../assets/images/Group1.svg';
import copyIcon from '../../assets/images/copy.svg';
import auctionHouseIcon from '../../assets/images/auction-house.svg';
import myProfileIcon from '../../assets/images/my-profile.svg';
import myNFTsIcon from '../../assets/images/my-nfts.svg';
import signOutIcon from '../../assets/images/sign-out.svg';
import marketplaceIcon from '../../assets/images/nft-marketplace.svg';
import socialMediaIcon from '../../assets/images/social-media.svg';
import aboutIcon from '../../assets/images/about.svg';
import whitepaperIcon from '../../assets/images/whitepaper.svg';
import teamIcon from '../../assets/images/team.svg';
import governanceIcon from '../../assets/images/governance.svg';
import yieldFarmingIcon from '../../assets/images/yield-farming.svg';
import docsIcon from '../../assets/images/docs.svg';

const MobileHeader = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { variant } = props;
  const ref = useRef(null);

  return (
    <div className={`wrapper ${variant}`}>
      <div className="app__logo">
        {variant.includes('dark') ? (
          <img src={appLightLogo} alt="App Logo" />
        ) : (
          <img src={appDarkLogo} alt="App Logo" />
        )}
      </div>
      <div className="tablet__nav">
        {variant.includes('logged') && (
          <div v className="wallet__connected__tablet">
            <img
              className="account__icon hide__on__tablet"
              src={accountIcon}
              alt="Account icon"
              aria-hidden="true"
            />
            <img
              className="account__icon show__on__tablet"
              src={accountDarkIcon}
              alt="Account icon"
              aria-hidden="true"
            />
          </div>
        )}
        <button type="button" className="hamburger">
          {!showMenu ? (
            <img src={hamburgerIcon} alt="Hamburger" />
          ) : (
            <img src={closeIcon} alt="Close" />
          )}
        </button>
      </div>
    </div>
  );
};

MobileHeader.propTypes = {
  variant: PropTypes.string,
};

MobileHeader.defaultProps = {
  variant: null,
};

export default MobileHeader;
