import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import './MobileView.scss';
import AppContext from '../../../../ContextAPI';
import Button from '../../../button/Button';
import hamburgerIcon from '../../../../assets/images/hamburger.svg';
import closeIcon from '../../../../assets/images/close-menu.svg';
import Group1 from '../../../../assets/images/Group1.svg';
import Group2 from '../../../../assets/images/Group2.svg';
import copyIcon from '../../../../assets/images/copy.svg';
import accountIcon from '../../../../assets/images/icon1.svg';
import accountDarkIcon from '../../../../assets/images/account-dark-icon.svg';
import metamaskLogo from '../../../../assets/images/metamask.png';
import ledgerLogo from '../../../../assets/images/ledger.png';
import keystoreLogo from '../../../../assets/images/keystore.png';
import trezorLogo from '../../../../assets/images/trezor.png';
import coinbaseLogo from '../../../../assets/images/coinbase.png';
import walletConnectLogo from '../../../../assets/images/wallet-connect.png';
import leftArrow from '../../../../assets/images/arrow.svg';
import auctionHouseIcon from '../../../../assets/images/auction-house.svg';
import myProfileIcon from '../../../../assets/images/my-profile.svg';
import myNFTsIcon from '../../../../assets/images/my-nfts.svg';
import signOutIcon from '../../../../assets/images/sign-out.svg';
import marketplaceIcon from '../../../../assets/images/nft-marketplace.svg';
import socialMediaIcon from '../../../../assets/images/social-media.svg';
import aboutIcon from '../../../../assets/images/about.svg';
import whitepaperIcon from '../../../../assets/images/whitepaper.svg';
import teamIcon from '../../../../assets/images/team.svg';
import governanceIcon from '../../../../assets/images/governance.svg';
import yieldFarmingIcon from '../../../../assets/images/yield-farming.svg';
import docsIcon from '../../../../assets/images/docs.svg';
import SubscribePopup from '../../../popups/SubscribePopup';
import { shortenEthereumAddress, toFixed } from '../../../../utils/helpers/format';

const MobileView = (props) => {
  const {
    ethereumAddress,
    handleConnectWallet,
    setShowMenu,
    setShowSelectWallet,
    showMenu,
    showSelectWallet,
    showInstallWalletPopup,
    setSelectedWallet,
    setShowInstallWalletPopup,
    selectedWallet,
  } = props;
  const {
    isWalletConnected,
    setIsWalletConnected,
    handleClickOutside,
    yourBalance,
    usdEthBalance,
    wethBalance,
    usdWethBalance,
  } = useContext(AppContext);
  const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const history = useHistory();

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
    <div className="mobile__nav">
      {isWalletConnected && (
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
                    <div className="ethereum__address">
                      {shortenEthereumAddress(ethereumAddress)}
                    </div>
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
                    My NFTs
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
      )}
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
            {!showSelectWallet ? (
              <>
                <li>
                  <div className="grid__menu">
                    <div>
                      <p className="title">Products</p>
                      <div>
                        <button
                          type="button"
                          className="disable"
                          // onClick={() => {
                          //   setShowMenu(false);
                          //   history.push('/minting-and-auctions/marketplace/active-auctions');
                          // }}
                        >
                          <img src={auctionHouseIcon} alt="Auction House" />
                          <span>Auction house</span>
                          <span className="tooltiptext">Coming soon</span>
                        </button>
                      </div>
                      <div>
                        <button type="button" className="disable">
                          <img src={marketplaceIcon} alt="NFT Marketplace" />
                          <span>NFT marketplace</span>
                          <span className="tooltiptext">Coming soon</span>
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
                    </div>
                    <div>
                      <p className="title">DAO</p>
                      <div>
                        <button type="button" className="disable">
                          <img src={governanceIcon} alt="Governance" />
                          <span>Governance</span>
                          <span className="tooltiptext">Coming soon</span>
                        </button>
                      </div>
                      <div>
                        <button type="button" className="disable">
                          <img src={yieldFarmingIcon} alt="Yield Farming" />
                          <span>Yield farming</span>
                          <span className="tooltiptext">Coming soon</span>
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => window.open('https://docs.universe.xyz/')}
                        >
                          <img src={docsIcon} alt="Docs" />
                          <span>Docs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                {!isWalletConnected && (
                  <li className="sign__in">
                    <Popup trigger={<button type="button">Join newsletter</button>}>
                      {(close) => <SubscribePopup close={close} />}
                    </Popup>
                    {/* <button type="button" onClick={() => setShowSelectWallet(true)}>
                      Sign In
                    </button> */}
                  </li>
                )}
              </>
            ) : (
              <div className="select_wallet__section">
                <div
                  className="backToMenu"
                  onClick={() => setShowSelectWallet(false)}
                  aria-hidden="true"
                >
                  <img src={leftArrow} alt="back" />
                  <span>Back to menu</span>
                </div>
                {!showInstallWalletPopup ? (
                  <>
                    <h1 className="title">Select Wallet</h1>
                    <p className="desc">Please pick a wallet to connect to Universe</p>
                    <div className="wallets">
                      <button type="button" onClick={() => handleConnectWallet('Metamask')}>
                        <img src={metamaskLogo} alt="Metamask" />
                      </button>
                      <button type="button" onClick={() => handleConnectWallet('Ledger')}>
                        <img src={ledgerLogo} alt="Ledger" />
                      </button>
                      <button type="button" onClick={() => handleConnectWallet('Keystore')}>
                        <img src={keystoreLogo} alt="Keystore" />
                      </button>
                      <button type="button" onClick={() => handleConnectWallet('Trezor')}>
                        <img src={trezorLogo} alt="Trezor" />
                      </button>
                      <button type="button" onClick={() => handleConnectWallet('Coinbase')}>
                        <img src={coinbaseLogo} alt="Coinbase" />
                      </button>
                      <button type="button" onClick={() => handleConnectWallet('WalletConnect')}>
                        <img src={walletConnectLogo} alt="WalletConnect" />
                      </button>
                    </div>
                    <p className="info">
                      We do not own your private keys and cannot access your funds without your
                      confirmation.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="title">Install {selectedWallet}</h1>
                    <p className="desc">
                      You need to have Metamask installed to continue. Once you have installed it,
                      please refresh the page
                    </p>
                    <div className="links">
                      <Button className="light-button">Install {selectedWallet}</Button>
                      <Button
                        className="light-border-button"
                        onClick={() => {
                          setShowInstallWalletPopup(false);
                          setSelectedWallet('');
                        }}
                      >
                        Go back
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

MobileView.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  handleConnectWallet: PropTypes.func.isRequired,
  showInstallWalletPopup: PropTypes.bool.isRequired,
  setShowInstallWalletPopup: PropTypes.func.isRequired,
  selectedWallet: PropTypes.string.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  showSelectWallet: PropTypes.bool.isRequired,
  setShowSelectWallet: PropTypes.func.isRequired,
};

export default MobileView;
