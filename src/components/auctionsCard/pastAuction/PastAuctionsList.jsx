import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './PastAuctionCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import PastAuctionCard from './PastAuctionCard.jsx';

const PastAuctionsList = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="past__auctions__list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          {loading ? (
            <AuctionsCardSkeleton variant="past" />
          ) : (
            <PastAuctionCard auction={auction} />
          )}
        </Animated>
      ))}
    </div>
  );
};

PastAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PastAuctionsList;
