import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import SelectWalletPopup from '../../popups/SelectWalletPopup';
import Icon from '../../../assets/images/icon1.svg';
import copyIcon from '../../../assets/images/copy.svg';
import AppContext from '../../../ContextAPI';
import arrowUP from '../../../assets/images/arrow-down.svg';
import Group1 from '../../../assets/images/Group1.svg';
import Group2 from '../../../assets/images/Group2.svg';
import auctionHouseIcon from '../../../assets/images/auction-house.svg';
import marketplaceIcon from '../../../assets/images/nft-marketplace.svg';
import socialMediaIcon from '../../../assets/images/social-media.svg';
import aboutIcon from '../../../assets/images/about.svg';
import whitepaperIcon from '../../../assets/images/whitepaper.svg';
import teamIcon from '../../../assets/images/team.svg';
import governanceIcon from '../../../assets/images/governance.svg';
import yieldFarmingIcon from '../../../assets/images/yield-farming.svg';
import docsIcon from '../../../assets/images/docs.svg';
import myProfileIcon from '../../../assets/images/my-profile.svg';
import myNFTsIcon from '../../../assets/images/my-nfts.svg';
import signOutIcon from '../../../assets/images/sign-out.svg';

const DesktopView = ({
  ethereumAddress,
  handleConnectWallet,
  showInstallWalletPopup,
  setShowInstallWalletPopup,
  selectedWallet,
  setSelectedWallet,
}) => {
  const { isWalletConnected, setIsWalletConnected } = useContext(AppContext);
  const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
  const [isMintingDropdownOpened, setIsMintingDropdownOpened] = useState(false);
  const [isAboutDropdownOpened, setIsAboutDropdownOpened] = useState(false);
  const [isDAODropdownOpened, setIsDAODropdownOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  return (
    <div className="desktop__nav">
      <ul>
        <li>
          <button
            type="button"
            className="menu-li"
            onClick={() => setIsMintingDropdownOpened(!isMintingDropdownOpened)}
          >
            <span className="nav__link__title">Products</span>
            <img className="arrow" src={arrowUP} alt="arrow" />
          </button>
          <div className="dropdown minting-drop">
            <div className="dropdown__body">
              <button
                type="button"
                onClick={() => {
                  history.push('/minting-and-auctions/marketplace/active-auctions');
                  setIsMintingDropdownOpened(false);
                }}
              >
                <img src={auctionHouseIcon} alt="Auction House" />
                Auction house
              </button>
              <button
                type="button"
                className="disable"
                onClick={() => {
                  setIsMintingDropdownOpened(false);
                }}
              >
                <img src={marketplaceIcon} alt="NFT Marketplace" />
                <span>NFT marketplace</span>
                <span className="tooltiptext">Coming soon</span>
              </button>
              <button
                type="button"
                className="disable"
                onClick={() => {
                  setIsMintingDropdownOpened(false);
                }}
              >
                <img src={socialMediaIcon} alt="Social Media" />
                <span>Social media</span>
                <span className="tooltiptext">Coming soon</span>
              </button>
            </div>
          </div>
        </li>
        <li>
          <button
            type="button"
            className="menu-li"
            onClick={() => setIsAboutDropdownOpened(!isAboutDropdownOpened)}
          >
            <span className="nav__link__title">Info</span>
            <img className="arrow" src={arrowUP} alt="arrow" />
          </button>
          <div className="dropdown minting-drop">
            <div className="dropdown__body">
              <button
                type="button"
                onClick={() => {
                  history.push('/minting-and-auctions/about');
                  setIsAboutDropdownOpened(false);
                }}
              >
                <img src={aboutIcon} alt="About" />
                About
              </button>
              <button
                type="button"
                onClick={() => {
                  history.push('/');
                  setIsAboutDropdownOpened(false);
                }}
              >
                <img src={whitepaperIcon} alt="Whitepaper" />
                Whitepaper
              </button>
              <button
                type="button"
                className="team"
                onClick={() => {
                  history.push('/team');
                  setIsAboutDropdownOpened(false);
                }}
              >
                <img src={teamIcon} alt="Team" />
                Team
              </button>
            </div>
          </div>
        </li>
        <li>
          <button
            type="button"
            className="menu-li"
            onClick={() => setIsDAODropdownOpened(!isDAODropdownOpened)}
          >
            <span className="nav__link__title">DAO</span>
            <img className="arrow" src={arrowUP} alt="arrow" />
          </button>
          <div className="dropdown minting-drop">
            <div className="dropdown__body">
              <button
                type="button"
                onClick={() => {
                  setIsDAODropdownOpened(false);
                }}
              >
                <img src={governanceIcon} alt="Governance" />
                Governance
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDAODropdownOpened(false);
                }}
              >
                <img src={yieldFarmingIcon} alt="Yield Farming" />
                Yield farming
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDAODropdownOpened(false);
                }}
              >
                <img src={docsIcon} alt="Docs" />
                Docs
              </button>
            </div>
          </div>
        </li>
        {isWalletConnected ? (
          <li>
            <button
              type="button"
              className="menu-li myAccount"
              onClick={() => setIsAccountDropdownOpened(!isAccountDropdownOpened)}
            >
              <img className="icon-img" src={Icon} alt="Diamond icon" />
              <span className="nav__link__title">My Account</span>
              <img className="arrow" src={arrowUP} alt="arrow" />
            </button>
            <div className="dropdown drop-account">
              <div className="dropdown__header">
                <div className="copy-div">
                  <img className="icon-img" src={Icon} alt="icon" />
                  <div className="ethereum__address">{ethereumAddress}</div>
                  <div className="copy__div">
                    <div className="copy" title="Copy to clipboard">
                      <div className="copied-div" hidden={!copied}>
                        Address copied!
                        <span />
                      </div>
                      <CopyToClipboard
                        text={ethereumAddress}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      >
                        <span>
                          <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
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
                <button
                  type="button"
                  onClick={() => {
                    history.push('/my-account');
                    setIsAccountDropdownOpened(false);
                  }}
                >
                  <img src={myProfileIcon} alt="My Profile" />
                  My profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    history.push('/my-nfts');
                    setIsAccountDropdownOpened(false);
                  }}
                >
                  <img src={myNFTsIcon} alt="My NFTs" />
                  My NFTs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    history.push('/my-auctions');
                    setIsAccountDropdownOpened(false);
                  }}
                >
                  <img src={auctionHouseIcon} alt="My Auctions" />
                  My auctions
                </button>
                <button
                  type="button"
                  className="signOut"
                  onClick={() => {
                    setIsAccountDropdownOpened(false);
                    setIsWalletConnected(!isWalletConnected);
                  }}
                >
                  <img src={signOutIcon} alt="Sign out" />
                  Sign out
                </button>
              </div>
            </div>
          </li>
        ) : (
          <li>
            <Popup
              trigger={
                <button type="button" className="sign__in">
                  Sign In
                </button>
              }
            >
              {(close) => (
                <SelectWalletPopup
                  close={close}
                  handleConnectWallet={handleConnectWallet}
                  showInstallWalletPopup={showInstallWalletPopup}
                  setShowInstallWalletPopup={setShowInstallWalletPopup}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                />
              )}
            </Popup>
          </li>
        )}
      </ul>
    </div>
  );
};

DesktopView.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  handleConnectWallet: PropTypes.func.isRequired,
  showInstallWalletPopup: PropTypes.bool.isRequired,
  setShowInstallWalletPopup: PropTypes.func.isRequired,
  selectedWallet: PropTypes.string.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
};

export default DesktopView;
