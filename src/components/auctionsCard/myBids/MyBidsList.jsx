import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './MyBidCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import MyBidCard from './MyBidCard.jsx';

const MyBidsList = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div className="my--bids--list">
      {data.map((auction) => (
        <Animated animationIn="fadeIn" key={auction.id}>
          {loading ? <AuctionsCardSkeleton variant="bid" /> : <MyBidCard auction={auction} />}
        </Animated>
      ))}
    </div>
  );
};

MyBidsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default MyBidsList;
