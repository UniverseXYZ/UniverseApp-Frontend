import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BiddersDropdown.scss';
import uuid from 'react-uuid';
import chevronIcon from '../../../assets/images/browse-nft-arrow-down.svg';

const BiddersDropdown = ({ startPlace, endPlace, setSelectedBidderIndex }) => {
  const generateBidderOptions = () => {
    const options = [];
    for (let i = startPlace; i <= endPlace; i += 1) {
      options.push({
        id: i,
        name: `Bidder #${i}`,
      });
    }
    return options;
  };
  const bidderOptions = generateBidderOptions();
  const [showBiddersDropdown, setShowBiddersDropdown] = useState(false);
  const [selectedBidder, setSelectedBidder] = useState(bidderOptions[0].name);

  return (
    <div
      className={`bidders--dropdown ${showBiddersDropdown ? 'open' : ''}`}
      aria-hidden="true"
      onClick={() => setShowBiddersDropdown(!showBiddersDropdown)}
    >
      <span>{selectedBidder}</span>
      <img src={chevronIcon} alt="Arrow" />
      <div className="box--shadow--effect--block" />
      {showBiddersDropdown && (
        <ul className="dropdown--items">
          {bidderOptions.map((bidder) => (
            <li
              key={bidder.id}
              aria-hidden="true"
              onClick={() => {
                setSelectedBidder(bidder.name);
                setSelectedBidderIndex(bidder.id);
              }}
            >
              {bidder.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
BiddersDropdown.propTypes = {
  startPlace: PropTypes.number.isRequired,
  endPlace: PropTypes.number.isRequired,
  setSelectedBidderIndex: PropTypes.func.isRequired,
};
export default BiddersDropdown;
