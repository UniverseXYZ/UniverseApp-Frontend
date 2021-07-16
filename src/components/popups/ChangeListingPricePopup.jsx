import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyIcon from '../../assets/images/marketplace/price.svg';

const ChangeListingPricePopup = ({ close }) => {
  const [bidAmount, setBidAmount] = useState(0.25);

  return (
    <div className="change--listing--price--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      <h1 className="title">Change the listing price</h1>
      <div className="form">
        <div className={`input--field ${!bidAmount ? 'error' : ''}`}>
          <div className="currency--dropdown">
            <div>
              <img src={currencyIcon} alt="Currency" />
              <span className="currency">ETH</span>
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
        </div>
        {!bidAmount && <p className="error">This field is required</p>}
        <div className="actions">
          <Button className="light-button">Set new price</Button>
          <Button className="light-border-button">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

ChangeListingPricePopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ChangeListingPricePopup;
