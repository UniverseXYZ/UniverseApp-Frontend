import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../input/Input.jsx';
import ETHIcon from '../../../assets/images/bid_icon.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/images/Vector.svg';
import { ReactComponent as WinnerIcon } from '../../../assets/images/winner-icon.svg';

const WinnerCard = ({
  data,
  winnerNumber,
  index,
  selectedWinner,
  setSelectedWinner,
  showReservePrice,
  setReservedPrice,
}) => (
  <div
    className={`winner-box${selectedWinner === index ? ' selected' : ''}`}
    key={index}
    onClick={() => setSelectedWinner(index)}
    aria-hidden
    style={{ width: 160 }}
  >
    <WinnerIcon className="winner--icon" />
    <p>{`Winner #${winnerNumber}`}</p>
    <span>{`${data.nftsData?.length} NFTs`}</span>
    {showReservePrice && (
      <div className="reserve--price">
        <label>Reserve price</label>
        <div className="reserve--price--field">
          <img className="eth--icon" src={ETHIcon} alt="eth" />
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={data.minimumBid}
            onChange={(e) => {
              setReservedPrice(e.target.value, index);
            }}
            error={data.reservePriceError}
            hoverBoxShadowGradient
            step="0.1"
          />
          {data.reservePriceError && (
            <div className="reserve--price--error">
              <ErrorIcon className="error--icon" />
              <div className="tooltip">
                The reserve price for this slot cannot be higher than for the slot above
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    <div className="box--shadow--effect--block" />
  </div>
);

WinnerCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setReservedPrice: PropTypes.func.isRequired,
  winnerNumber: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  selectedWinner: PropTypes.number.isRequired,
  setSelectedWinner: PropTypes.func.isRequired,
  showReservePrice: PropTypes.bool.isRequired,
};

export default WinnerCard;
