import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/images/icon.svg';

const IncludeReservePrice = ({ showReservePrice, setShowReservePrice }) => {
  const [showIncludeReservePriceInfoBox, setShowIncludeReservePriceInfoBox] = useState(false);

  return (
    <div className="include--reserve--price">
      <h1>Include reserve price</h1>
      <InfoIcon
        onMouseOver={() => setShowIncludeReservePriceInfoBox(true)}
        onFocus={() => setShowIncludeReservePriceInfoBox(true)}
        onMouseLeave={() => setShowIncludeReservePriceInfoBox(false)}
        onBlur={() => setShowIncludeReservePriceInfoBox(false)}
      />
      <label className="switch">
        <input
          type="checkbox"
          value={showReservePrice}
          checked={showReservePrice}
          onChange={(e) => setShowReservePrice(e.target.checked)}
        />
        <span className="slider round" />
      </label>
      {showIncludeReservePriceInfoBox && (
        <div className="info-text">
          <p>
            Reserve price parameter may be used to make sure that NFTs from the slot will not be
            sold under the target price value. <br />
            <br />
            You are only able to set the reserve price for the slot when the slot above has equal or
            higher reserve price.
          </p>
        </div>
      )}
    </div>
  );
};

IncludeReservePrice.propTypes = {
  showReservePrice: PropTypes.bool.isRequired,
  setShowReservePrice: PropTypes.func.isRequired,
};

export default IncludeReservePrice;
