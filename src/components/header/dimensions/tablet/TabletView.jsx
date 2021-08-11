import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Animated } from 'react-animated-css';
import './TabletView.scss';
import {
  PLACEHOLDER_MARKETPLACE_AUCTIONS,
  PLACEHOLDER_MARKETPLACE_NFTS,
  PLACEHOLDER_MARKETPLACE_USERS,
  PLACEHOLDER_MARKETPLACE_COLLECTIONS,
  PLACEHOLDER_MARKETPLACE_COMMUNITIES,
  PLACEHOLDER_MARKETPLACE_GALLERIES,
} from '../../../../utils/fixtures/BrowseNFTsDummyData';
import SelectWalletPopup from '../../../popups/SelectWalletPopup.jsx';
import hamburgerIcon from '../../../../assets/images/hamburger.svg';
import closeIcon from '../../../../assets/images/close-menu.svg';
import accountIcon from '../../../../assets/images/icon1.svg';
import accountDarkIcon from '../../../../assets/images/account-dark-icon.svg';
import AppContext from '../../../../ContextAPI';
import Group2 from '../../../../assets/images/Group2.svg';
import Group1 from '../../../../assets/images/Group1.svg';
import copyIcon from '../../../../assets/images/copy.svg';
import auctionHouseIcon from '../../../../assets/images/auction-house.svg';
import myProfileIcon from '../../../../assets/images/my-profile.svg';
import myNFTsIcon from '../../../../assets/images/my-nfts.svg';
import signOutIcon from '../../../../assets/images/sign-out.svg';
import marketplaceIcon from '../../../../assets/images/nft-marketplace.svg';
import socialMediaIcon from '../../../../assets/images/social-media.svg';
import polymorphsIcon from '../../../../assets/images/polymorphs.svg';
import coreDropsIcon from '../../../../assets/images/core-drops.svg';
import aboutIcon from '../../../../assets/images/about.svg';
import whitepaperIcon from '../../../../assets/images/whitepaper.svg';
import teamIcon from '../../../../assets/images/team.svg';
import governanceIcon from '../../../../assets/images/governance.svg';
import yieldFarmingIcon from '../../../../assets/images/yield-farming.svg';
import forumIcon from '../../../../assets/images/forum.svg';
import signalIcon from '../../../../assets/images/signal.svg';
import docsIcon from '../../../../assets/images/docs.svg';
import SubscribePopup from '../../../popups/SubscribePopup.jsx';
import { shortenEthereumAddress, toFixed } from '../../../../utils/helpers/format';

const TabletView = (props) => {
  const {
    handleConnectWallet,
    showInstallWalletPopup,
    setShowInstallWalletPopup,
    selectedWallet,
    setSelectedWallet,
    showMenu,
    setShowMenu,
    showSearch,
    setShowSearch,
  } = props;
  const {
    address,
    isWalletConnected,
    setIsWalletConnected,
    handleClickOutside,
    yourBalance,
    usdEthBalance,
    wethBalance,
    usdWethBalance,
    isAuthenticated,
    connectWeb3,
  } = useContext(AppContext);
  const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef(null);
  const history = useHistory();

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (searchValue) {
        history.push(`/search`, { query: searchValue });
        setSearchValue('');
        searchRef.current.blur();
        setShowSearch(false);
      }
    }
  };
  const handleAllResults = () => {
    history.push(`/search`, { query: searchValue });
    setSearchValue('');
    searchRef.current.blur();
    setShowSearch(false);
  };

  useEffect(() => {
    if (showSearch) {
      document.body.classList.add('no__scroll');
    } else {
      document.body.classList.remove('no__scroll');
    }
  }, [showSearch]);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('no__scroll');
    } else {
      document.body.classList.remove('no__scroll');
    }
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener(
      'click',
      (e) => handleClickOutside(e, 'account__icon', ref, setIsAccountDropdownOpened),
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, 'account__icon', ref, setIsAccountDropdownOpened),
        true
      );
    };
  });

  return (
    <div className="tablet__nav">
      {isWalletConnected && isAuthenticated ? (
        <div className="wallet__connected__tablet">
          <img
            className="account__icon hide__on__tablet"
            src={accountIcon}
            onClick={() => {
              setIsAccountDropdownOpened(!isAccountDropdownOpened);
              setShowMenu(false);
            }}
            alt="Account icon"
            aria-hidden="true"
          />
          <img
            className="account__icon show__on__tablet"
            src={accountDarkIcon}
            onClick={() => {
              setIsAccountDropdownOpened(!isAccountDropdownOpened);
              setShowMenu(false);
            }}
            alt="Account icon"
            aria-hidden="true"
          />
          {isAccountDropdownOpened && (
            <Animated animationIn="fadeIn">
              <div ref={ref} className="dropdown drop-account">
                <div className="dropdown__header">
                  <div className="copy-div">
                    <img className="icon-img" src={accountIcon} alt="icon" />
                    <div className="ethereum__address">{shortenEthereumAddress(address)}</div>
                    <div className="copy__div">
                      <div className="copy" title="Copy to clipboard">
                        <div className="copied-div" hidden={!copied}>
                          Address copied!
                          <span />
                        </div>
                        <CopyToClipboard
                          text={address}
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
                    <span className="first-span">{toFixed(yourBalance, 2)} ETH</span>
                    <span className="second-span">${toFixed(usdEthBalance, 2)}</span>
                  </div>
                  <div className="group2">
                    <img src={Group2} alt="WETH" />
                    <span className="first-span">{toFixed(wethBalance, 2)} WETH</span>
                    <span className="second-span">${toFixed(usdWethBalance, 2)}</span>
                  </div>
                </div>
                <div className="dropdown__body">
                  <button
                    type="button"
                    onClick={() => {
                      history.push('/my-account');
                      setIsAccountDropdownOpened(!isAccountDropdownOpened);
                    }}
                  >
                    <img src={myProfileIcon} alt="My Profile" />
                    My profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      history.push('/my-nfts');
                      setIsAccountDropdownOpened(!isAccountDropdownOpened);
                    }}
                  >
                    <img src={myNFTsIcon} alt="My NFTs" />
                    My NTFs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      history.push('/my-auctions');
                      setIsAccountDropdownOpened(!isAccountDropdownOpened);
                    }}
                  >
                    <img src={auctionHouseIcon} alt="My Auctions" />
                    My auctions
                  </button>
                  <button
                    type="button"
                    className="signOut"
                    onClick={() => {
                      setIsAccountDropdownOpened(!isAccountDropdownOpened);
                      setIsWalletConnected(!isWalletConnected);
                    }}
                  >
                    <img src={signOutIcon} alt="Sign out" />
                    Sign out
                  </button>
                </div>
              </div>
            </Animated>
          )}
        </div>
      ) : null}
      <button type="button" className="hamburger" onClick={() => setShowMenu(!showMenu)}>
        {!showMenu ? (
          <img src={hamburgerIcon} alt="Hamburger" />
        ) : (
          <img src={closeIcon} alt="Close" />
        )}
      </button>
      {showMenu && (
        <>
          <div className="overlay" />
          <ul className="nav__menu">
            <li>
              <div className="grid__menu">
                <div>
                  <p className="title">Products</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        history.push('/minting-and-auctions/marketplace/active-auctions');
                      }}
                    >
                      <img src={auctionHouseIcon} alt="Auction House" />
                      <span>Auction house</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        history.push('/marketplace');
                      }}
                    >
                      <img src={marketplaceIcon} alt="NFT Marketplace" />
                      <span>NFT marketplace</span>
                    </button>
                  </div>
                  <div>
                    <button type="button" className="disable">
                      <img src={socialMediaIcon} alt="Social Media" />
                      <span>Social media</span>
                      <span className="tooltiptext">Coming soon</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="title">NFT Drops</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        history.push('/polymorphs');
                      }}
                    >
                      <img src={polymorphsIcon} alt="Polymorphs" />
                      <span>Polymorphs</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      // onClick={() => {
                      //   history.push('/core-drops');
                      // }}
                      className="disable"
                    >
                      <img src={coreDropsIcon} alt="Core drops" />
                      <span>OG planet drops</span>
                      <span className="tooltiptext">Coming soon</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="title">Info</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        history.push('/about');
                      }}
                    >
                      <img src={aboutIcon} alt="About" />
                      About
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        window.open('https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper')
                      }
                    >
                      <img src={whitepaperIcon} alt="Whitepaper" />
                      Whitepaper
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="team"
                      onClick={() => {
                        setShowMenu(false);
                        history.push('/team');
                      }}
                    >
                      <img src={teamIcon} alt="Team" />
                      Team
                    </button>
                  </div>
                  <div>
                    <button type="button" onClick={() => window.open('https://docs.universe.xyz/')}>
                      <img src={docsIcon} alt="Docs" />
                      <span>Docs</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="title">DAO</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => window.open('https://dao.universe.xyz/governance')}
                    >
                      <img src={governanceIcon} alt="Governance" />
                      <span>Governance</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => window.open('https://dao.universe.xyz/yield-farming')}
                    >
                      <img src={yieldFarmingIcon} alt="Yield Farming" />
                      <span>Yield farming</span>
                    </button>
                  </div>
                  {/* <div>
                    <button
                      type="button"
                      onClick={() => window.open('https://forum.universe.xyz/')}
                    >
                      <img src={forumIcon} alt="Forum" />
                      <span>Forum</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => window.open('https://signal.universe.xyz/#/')}
                    >
                      <img src={signalIcon} alt="Signal" />
                      <span>Signal</span>
                    </button>
                  </div> */}
                </div>
              </div>
            </li>
            {!isWalletConnected && (
              <li className="sign__in">
                <button type="button" onClick={() => connectWeb3()}>
                  Sign In
                </button>
                {/* <Popup trigger={<button type="button">Join newsletter</button>}>
                  {(close) => <SubscribePopup close={close} />}
                </Popup> */}
                {/* <Popup trigger={<button type="button">Sign in</button>}>
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
                </Popup> */}
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

TabletView.propTypes = {
  handleConnectWallet: PropTypes.func.isRequired,
  showInstallWalletPopup: PropTypes.bool.isRequired,
  setShowInstallWalletPopup: PropTypes.func.isRequired,
  selectedWallet: PropTypes.string.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  setShowSearch: PropTypes.func.isRequired,
};

export default TabletView;
