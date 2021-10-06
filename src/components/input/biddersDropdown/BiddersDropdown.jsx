import React, { useState } from 'react';
import './BiddersDropdown.scss';
import uuid from 'react-uuid';
import chevronIcon from '../../../assets/images/browse-nft-arrow-down.svg';

const BiddersDropdown = () => {
  const [showBiddersDropdown, setShowBiddersDropdown] = useState(false);
  const [bidders, setBidders] = useState([
    {
      id: uuid(),
      name: 'Bidder #1',
    },
    {
      id: uuid(),
      name: 'Bidder #2',
    },
    {
      id: uuid(),
      name: 'Bidder #3',
    },
    {
      id: uuid(),
      name: 'Bidder #4',
    },
    {
      id: uuid(),
      name: 'Bidder #5',
    },
  ]);
  const [selectedBidder, setSelectedBidder] = useState(bidders[0].name);

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
          {bidders.map((bidder) => (
            <li key={bidder.id} aria-hidden="true" onClick={() => setSelectedBidder(bidder.name)}>
              {bidder.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BiddersDropdown;
