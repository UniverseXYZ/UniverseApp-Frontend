import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './ActiveAuctionCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import ActiveAuctionCard from './ActiveAuctionCard.jsx';

const ActiveAuctionsList = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="active__auctions__list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          {loading ? (
            <AuctionsCardSkeleton variant="active" />
          ) : (
            <ActiveAuctionCard auction={auction} />
          )}
        </Animated>
      ))}
    </div>
  );
};

ActiveAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default ActiveAuctionsList;
