import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import { CONNECTORS_NAMES } from '../../utils/dictionary';
import {
  MetamaskLogo,
  LedgerLogo,
  PortisLogo,
  TrezorLogo,
  CoinbaseLogo,
  WalletConnectLogo,
} from '../ui-elements/Logos';

const SelectWalletPopup = (props) => {
  const {
    close,
    handleConnectWallet,
    showInstallWalletPopup,
    setShowInstallWalletPopup,
    selectedWallet,
    setSelectedWallet,
  } = props;

  return (
    <div className="select_wallet__popup">
      <img
        className="close__popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {!showInstallWalletPopup ? (
        <>
          <h1 className="title">Select Wallet</h1>
          <p className="desc">Please pick a wallet to connect to Universe</p>
          <div className="wallets">
            <button type="button" onClick={() => handleConnectWallet(CONNECTORS_NAMES.MetaMask)}>
              <MetamaskLogo />
            </button>
            <button
              className="disable"
              type="button"
              onClick={() => handleConnectWallet(CONNECTORS_NAMES.Ledger)}
            >
              <LedgerLogo />
            </button>
            <button
              className="disable"
              type="button"
              onClick={() => handleConnectWallet(CONNECTORS_NAMES.Portis)}
            >
              <PortisLogo />
            </button>
            <button
              className="disable"
              type="button"
              onClick={() => handleConnectWallet(CONNECTORS_NAMES.Trezor)}
            >
              <TrezorLogo />
            </button>
            <button
              className="disable"
              type="button"
              onClick={() => handleConnectWallet(CONNECTORS_NAMES.Coinbase)}
            >
              <CoinbaseLogo />
            </button>
            <button
              type="button"
              onClick={() => handleConnectWallet(CONNECTORS_NAMES.WalletConnect)}
            >
              <WalletConnectLogo />
            </button>
          </div>
          <p className="info">
            We do not own your private keys and cannot access your funds without your confirmation.
          </p>
        </>
      ) : (
        <>
          <h1 className="title">Install {selectedWallet}</h1>
          <p className="desc">
            You need to have Metamask installed to continue. Once you have installed it, please
            refresh the page
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
  );
};

SelectWalletPopup.propTypes = {
  close: PropTypes.func.isRequired,
  handleConnectWallet: PropTypes.func.isRequired,
  showInstallWalletPopup: PropTypes.bool.isRequired,
  setShowInstallWalletPopup: PropTypes.func.isRequired,
  selectedWallet: PropTypes.string.isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
};

export default SelectWalletPopup;
