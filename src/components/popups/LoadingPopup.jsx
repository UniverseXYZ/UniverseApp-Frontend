/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import Contracts from '../../contracts/contracts.json';
import { formatAddress } from '../../utils/helpers/format.js';

const LoadingPopup = ({ onClose, text, contractInteraction }) => {
  const { activeTxHashes } = useMyNftsContext();

  const chain = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  const generateLink = (addr) => `https://${chain.name}.etherscan.io/tx/${addr}`;

  return (
    <div className="loading-div popup-div" id="loading-popup-div">
      <div className="loading-ring">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="loading-text">
        {text ? (
          <>
            <p>{text}</p>
          </>
        ) : (
          <p>
            <span>Loading... do not click refresh or leave this page. </span>
            <span>Just kidding, you can do whatever you want. </span>
            <span>This is Ethereum!</span>
          </p>
        )}
      </div>
      <div style={{ maxHeight: 150, overflowY: 'scroll', marginTop: 0 }} className="loading-text">
        {contractInteraction &&
          (!activeTxHashes?.length ? (
            <p className="popup-semi-text">The transaction hash will appear here soon.</p>
          ) : activeTxHashes.length === 1 ? (
            <>
              <p className="popup-hash">
                Transaction hash:{' '}
                <a target="_blank" href={generateLink(activeTxHashes[0])} rel="noreferrer">
                  {formatAddress(activeTxHashes[0])}
                </a>
              </p>
            </>
          ) : (
            activeTxHashes.map((tx, i) => (
              <p className="popup-hash" key={tx}>
                Transaction hash #{i + 1}:{' '}
                <a target="_blank" href={generateLink(tx)} rel="noreferrer">
                  {formatAddress(tx)}
                </a>
              </p>
            ))
          ))}
      </div>
      <div className="loading-btns">
        <Button onClick={onClose} className="light-border-button">
          Close
        </Button>
      </div>
    </div>
  );
};

LoadingPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string,
  contractInteraction: PropTypes.bool,
};

LoadingPopup.defaultProps = {
  text: '',
  contractInteraction: false,
};

export default LoadingPopup;
