import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './FutureAuctionCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import FutureAuctionCard from './FutureAuctionCard.jsx';

const FutureAuctionsList = ({ data, loading }) => (
  <div className="future__auctions__list">
    {data.map((auction) => (
      <Animated animationIn="fadeIn" key={auction.id}>
        {loading ? (
          <AuctionsCardSkeleton variant="future" />
        ) : (
          <FutureAuctionCard auction={auction} />
        )}
      </Animated>
    ))}
  </div>
);

FutureAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FutureAuctionsList;
