import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import DesktopView from './dimensions/desktop/DesktopView.jsx';
import TabletView from './dimensions/tablet/TabletView.jsx';
import MobileView from './dimensions/mobile/MobileView.jsx';
import AppContext from '../../ContextAPI';

const Header = ({ location }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { website } = useContext(AppContext);
  const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';

  const [selectedWallet, setSelectedWallet] = useState('');
  const [installed, setInstalled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);

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
      location.pathname === '/team'
    ) {
      document.querySelector('header').classList.add('dark');
    } else {
      document.querySelector('header').classList.remove('dark');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (website && showMenu) {
      document.querySelector('header').classList.remove('dark');
    } else if (website && !showMenu) {
      document.querySelector('header').classList.add('dark');
    }
  }, [showMenu, website]);

  return (
    <header>
      <div className="app__logo">
        <Link className="dark" to="/">
          <img src={appDarkLogo} alt="App Logo" />
        </Link>
        <Link className="light" to="/">
          <img src={appLightLogo} alt="App Logo" />
        </Link>
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
