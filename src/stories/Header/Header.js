import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import './Header.scss';

import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import arrowUP from '../../assets/images/arrow-down.svg';
import Group1 from '../../assets/images/Group1.svg';
import Group2 from '../../assets/images/Group2.svg';
import auctionHouseIcon from '../../assets/images/auction-house.svg';
import marketplaceIcon from '../../assets/images/nft-marketplace.svg';
import socialMediaIcon from '../../assets/images/social-media.svg';
import aboutIcon from '../../assets/images/about.svg';
import whitepaperIcon from '../../assets/images/whitepaper.svg';
import teamIcon from '../../assets/images/team.svg';
import governanceIcon from '../../assets/images/governance.svg';
import yieldFarmingIcon from '../../assets/images/yield-farming.svg';
import docsIcon from '../../assets/images/docs.svg';
import myProfileIcon from '../../assets/images/my-profile.svg';
import myNFTsIcon from '../../assets/images/my-nfts.svg';
import signOutIcon from '../../assets/images/sign-out.svg';
import Icon from '../../assets/images/icon1.svg';

const Header = (props) => {
  const { variant } = props;
  return (
    <div className={`wrapper ${variant}`}>
      <div className="app__logo">
        {variant.includes('dark') ? (
          <img src={appLightLogo} alt="App Logo" />
        ) : (
          <img src={appDarkLogo} alt="App Logo" />
        )}
      </div>

      <div className="desktop__nav">
        <ul>
          <li>
            <button type="button" className="menu-li">
              <span className="nav__link__title">Products</span>
              <img className="arrow" src={arrowUP} alt="arrow" />
            </button>
            <div className="dropdown minting-drop">
              <div className="dropdown__body">
                <button type="button">
                  <img src={auctionHouseIcon} alt="Auction House" />
                  <span>Auction house</span>
                </button>
                <button type="button" className="disable">
                  <img src={marketplaceIcon} alt="NFT Marketplace" />
                  <span>NFT marketplace</span>
                  <span className="tooltiptext">Coming soon</span>
                </button>
                <button type="button" className="disable">
                  <img src={socialMediaIcon} alt="Social Media" />
                  <span>Social media</span>
                  <span className="tooltiptext">Coming soon</span>
                </button>
              </div>
            </div>
          </li>
          <li>
            <button type="button" className="menu-li">
              <span className="nav__link__title">Info</span>
              <img className="arrow" src={arrowUP} alt="arrow" />
            </button>
            <div className="dropdown minting-drop">
              <div className="dropdown__body">
                <button type="button">
                  <img src={aboutIcon} alt="About" />
                  About
                </button>
                <button type="button">
                  <img src={whitepaperIcon} alt="Whitepaper" />
                  Whitepaper
                </button>
                <button type="button" className="team">
                  <img src={teamIcon} alt="Team" />
                  Team
                </button>
              </div>
            </div>
          </li>
          <li>
            <button type="button" className="menu-li">
              <span className="nav__link__title">DAO</span>
              <img className="arrow" src={arrowUP} alt="arrow" />
            </button>
            <div className="dropdown minting-drop">
              <div className="dropdown__body">
                <button type="button" className="disable">
                  <img src={governanceIcon} alt="Governance" />
                  <span>Governance</span>
                  <span className="tooltiptext">Coming soon</span>
                </button>
                <button type="button" className="disable">
                  <img src={yieldFarmingIcon} alt="Yield Farming" />
                  <span>Yield farming</span>
                  <span className="tooltiptext">Coming soon</span>
                </button>
                <button type="button">
                  <img src={docsIcon} alt="Docs" />
                  <span>Docs</span>
                </button>
              </div>
            </div>
          </li>
          {!variant.includes('logged') && (
            <li>
              <button type="button" className="sign__in">
                Sign In
              </button>
            </li>
          )}
          {variant.includes('logged') && (
            <li>
              <button type="button" className="menu-li myAccount">
                <img className="icon-img" src={Icon} alt="Diamond icon" />
                <span className="nav__link__title">My account</span>
                <img className="arrow" src={arrowUP} alt="arrow" />
              </button>
              <div className="dropdown drop-account">
                <div className="dropdown__header">
                  <div className="copy-div">
                    <img className="icon-img" src={Icon} alt="icon" />
                  </div>
                  <div className="group1">
                    <img src={Group1} alt="ETH" />
                    <span className="first-span">6,24 ETH</span>
                    <span className="second-span">$10,554</span>
                  </div>
                  <div className="group2">
                    <img src={Group2} alt="WETH" />
                    <span className="first-span">6,24 WETH</span>
                    <span className="second-span">$10,554</span>
                  </div>
                </div>
                <div className="dropdown__body">
                  <button type="button">
                    <img src={myProfileIcon} alt="My Profile" />
                    My profile
                  </button>
                  <button type="button">
                    <img src={myNFTsIcon} alt="My NFTs" />
                    My NFTs
                  </button>
                  <button type="button">
                    <img src={auctionHouseIcon} alt="My Auctions" />
                    My auctions
                  </button>
                  <button type="button" className="signOut">
                    <img src={signOutIcon} alt="Sign out" />
                    Sign out
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  variant: PropTypes.string,
};

Header.defaultProps = {
  variant: null,
};

export default Header;
