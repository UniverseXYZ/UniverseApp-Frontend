import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import DesktopView from './dimensions/desktop/DesktopView.jsx';
import TabletView from './dimensions/tablet/TabletView.jsx';
import MobileView from './dimensions/mobile/MobileView.jsx';
import AppContext from '../../ContextAPI';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import searchIcon from '../../assets/images/big-search.svg';

const Header = ({ location }) => {
  const { isWalletConnected, setIsWalletConnected, darkMode } = useContext(AppContext);
  const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';
  const history = useHistory();
  const [selectedWallet, setSelectedWallet] = useState('');
  const [installed, setInstalled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef();

  const handleSearchChange = (e) => {
    if (e.keyCode === 13) {
      history.push(`/search`, { query: searchValue });
      setSearchValue('');
      searchRef.current.blur();
    }
  };

  const handleConnectWallet = (wallet) => {
    // Here need to check if selected wallet is installed in browser
    setSelectedWallet(wallet);
    if (installed) {
      setIsWalletConnected(true);
      setShowMenu(false);
      setShowSelectWallet(false);
    } else {
      setShowInstallWalletPopup(true);
    }
  };

  useEffect(() => {
    setShowMenu(false);
    if (
      location.pathname === '/' ||
      location.pathname === '/about' ||
      location.pathname === '/minting-and-auctions/marketplace/active-auctions' ||
      location.pathname === '/minting-and-auctions/marketplace/future-auctions' ||
      location.pathname === '/polymorphs' ||
      location.pathname === '/mint-polymorph' ||
      location.pathname === '/team'
    ) {
      document.querySelector('header').classList.add('dark');
    } else {
      document.querySelector('header').classList.remove('dark');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (darkMode && showMenu) {
      document.querySelector('header').classList.remove('dark');
    } else if (darkMode && !showMenu) {
      document.querySelector('header').classList.add('dark');
    }
  }, [showMenu, darkMode]);

  return (
    <header>
      <div className="app__logo">
        <Link className="dark" to="/">
          <img src={appDarkLogo} alt="App Logo" />
        </Link>
        <Link className="light" to="/">
          <img src={appLightLogo} alt="App Logo" />
        </Link>
        <div className="search--field">
          <img src={searchIcon} alt="Search" />
          <input
            type="text"
            placeholder="Search"
            ref={searchRef}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyDown={handleSearchChange}
          />
        </div>
      </div>
      <DesktopView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
      />
      <TabletView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <MobileView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        setShowMenu={setShowMenu}
        setShowSelectWallet={setShowSelectWallet}
        showMenu={showMenu}
        showSelectWallet={showSelectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setSelectedWallet={setSelectedWallet}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
      />
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default withRouter(Header);
