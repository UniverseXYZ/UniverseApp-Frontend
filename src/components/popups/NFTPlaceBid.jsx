import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDown from '../../assets/images/arrow-down.svg';

const NFTPlaceBid = ({ close }) => {
  const [bidAmount, setBidAmount] = useState(0.25);

  return (
    <div className="nft--place--bid--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      <h1 className="title">Place a bid</h1>
      <div className="form">
        <label>Price</label>
        <div className="input--field">
          <div className="currency--dropdown">
            <div>
              <span className="currency">ETH</span>
              <img src={arrowDown} alt="arrow" />
            </div>
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>
          <div className="convert--to--dollar">$ 456.00</div>
        </div>
      </div>
    </div>
  );
};

NFTPlaceBid.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NFTPlaceBid;
