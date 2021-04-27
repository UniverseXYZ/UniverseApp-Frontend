import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import Icon from '../../../assets/images/icon1.svg';
import copyIcon from '../../../assets/images/copy.svg';
import AppContext from '../../../ContextAPI';
import arrowUP from '../../../assets/images/arrow-down.svg';
import Group1 from '../../../assets/images/Group1.svg';
import Group2 from '../../../assets/images/Group2.svg';
import SelectWalletPopup from '../../popups/SelectWalletPopup';

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
            <span className="nav__link__title">Minting & Auctions</span>
            <img className="arrow" src={arrowUP} alt="arrow" />
          </button>
          <div className="dropdown minting-drop">
            <div className="dropdown__body">
              <button
                type="button"
                onClick={() => {
                  history.push('/minting-and-auctions/about');
                  setIsMintingDropdownOpened(false);
                }}
              >
                About
              </button>
              <button
                type="button"
                className="active-auctions"
                onClick={() => {
                  history.push('/minting-and-auctions/marketplace/active-auctions');
                  setIsMintingDropdownOpened(false);
                }}
              >
                Active auctions
              </button>
              <button
                type="button"
                onClick={() => {
                  history.push('/minting-and-auctions/marketplace/future-auctions');
                  setIsMintingDropdownOpened(false);
                }}
              >
                Future auctions
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
            <span className="nav__link__title">About</span>
            <img className="arrow" src={arrowUP} alt="arrow" />
          </button>
          <div className="dropdown minting-drop">
            <div className="dropdown__body">
              <button
                type="button"
                onClick={() => {
                  history.push('/');
                  setIsAboutDropdownOpened(false);
                }}
              >
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
                Team
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
                  My profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    history.push('/my-nfts');
                    setIsAccountDropdownOpened(false);
                  }}
                >
                  My NFTs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    history.push('/my-auctions');
                    setIsAccountDropdownOpened(false);
                  }}
                >
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
