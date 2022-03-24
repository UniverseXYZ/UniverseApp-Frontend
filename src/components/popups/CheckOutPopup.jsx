import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Input from '../input/Input';
import closeIcon from '../../assets/images/close-menu.svg';
import nft1 from '../../assets/images/marketplace/nfts/nft1.png';
import priceIcon from '../../assets/images/bid-icon.svg';
import warningIcon from '../../assets/images/Exclamation.svg';

const CheckOutPopup = ({ onClose }) => {
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [checkout, setCheckout] = useState(false);
  return (
    <div className="checkout__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      {!checkout ? (
        <div className="checkout__part">
          <h2>Checkout</h2>
          {showWarning && (
            <div className="warning__div">
              <img src={warningIcon} alt="Warning" />
              <p className="warnig-text">This item has not been reviewed by Universe</p>
            </div>
          )}
          <div className="checkout__header">
            <h4>Item</h4>
            <h4>Subtotal</h4>
          </div>
          <div className="checkout__nft">
            <div className="nft__picture">
              <img src={nft1} alt="NFT" />
            </div>
            <div className="nft__description">
              <div className="nft__name">
                <h5>NFT name</h5>
                <p>Collection name</p>
              </div>
              <div className="nft__bid">
                <h5>
                  <img src={priceIcon} alt="Price" /> 0.5
                </h5>
                <p>$1408.39</p>
              </div>
            </div>
          </div>
          <div className="checkout__total">
            <h4>Total</h4>
            <div className="total__bid">
              <h3>
                <img src={priceIcon} alt="Price" /> 0.5
              </h3>
              <p>$208.39</p>
            </div>
          </div>
          <div className="checkout__button">
            <button
              type="button"
              className="light-button"
              disabled={checkoutDisabled}
              onClick={() => setCheckout(true)}
            >
              Checkout
            </button>
            {!showWarning && (
              <button
                type="button"
                className="light-border-button"
                onClick={() => setShowWarning(!showWarning)}
              >
                Add funds
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="congratulation__part">
          <h1>Congratulations!</h1>
          <p>You have successfully bought the NFT</p>
          <img src={nft1} alt="NFT" />
          <div className="buttons">
            <Button className="light-button">My NFTs</Button>
            <Button className="light-border-button" onClick={() => onClose()}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

CheckOutPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CheckOutPopup;
