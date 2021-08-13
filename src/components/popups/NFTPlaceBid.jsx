import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import currencyIcon from '../../assets/images/eth-icon-new.svg';
import congratsIcon from '../../assets/images/bid-submitted.png';

const NFTPlaceBid = ({ close }) => {
  const [bidAmount, setBidAmount] = useState(0.25);
  const [loading, setLoading] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleClick = () => {
    setLoading('processing');
    setTimeout(() => {
      setLoading('done');
    }, 2000);
  };

  return (
    <div className="nft--place--bid--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {!loading ? (
        <div className="step1">
          <h1 className="title">Place a bid</h1>
          <div className="form">
            <label className="price">Price</label>
            <div className={`input--field ${!bidAmount ? 'error' : ''}`}>
              <div className="currency--dropdown">
                <div>
                  <img src={currencyIcon} alt="Currency" />
                  <span className="currency">ETH</span>
                  <img className="arrow" src={arrowDown} alt="arrow" />
                </div>
              </div>
              <div>
                <input
                  className="input--field--item"
                  type="number"
                  placeholder="Amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div className="convert--to--dollar">
                {!bidAmount ? '$ 0.00' : `$ ${(bidAmount * 2156).toFixed(2)}`}
              </div>
            </div>
            {!bidAmount && <p className="error">This field is required</p>}
            <div className="checkout__checkbox">
              <div className="custom__checkbox">
                <label htmlFor="toggleSelection">
                  <input
                    id="toggleSelection"
                    type="checkbox"
                    value={checkboxValue}
                    onChange={() => setCheckboxValue(!checkboxValue)}
                  />
                  <i />
                </label>
              </div>
              <p>
                By checking this box, I agree to Universe&#39;s <span>Terms of Service</span>
              </p>
            </div>
            <div className="actions">
              <Button
                className="light-button"
                disabled={!bidAmount || !checkboxValue}
                onClick={handleClick}
              >
                Place Bid
              </Button>
              <Button className="light-border-button">Convert ETH</Button>
            </div>
          </div>
        </div>
      ) : loading === 'processing' ? (
        <div className="step2">
          <h1 className="title">Listing your item...</h1>
          <p className="desc">
            Just accept the signature request and wait for us to process your listing
          </p>
          <div className="loading--div">
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
        </div>
      ) : (
        <div className="step3">
          <img className="check--icon" src={congratsIcon} alt="Congrats" />
          <h1 className="title">Congratulations!</h1>
          <p className="desc">
            You have successfully placed a bid for
            <b>
              <img src={currencyIcon} alt="Currency" /> {bidAmount}
            </b>
          </p>
          <Button className="light-border-button" onClick={close}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

NFTPlaceBid.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NFTPlaceBid;
