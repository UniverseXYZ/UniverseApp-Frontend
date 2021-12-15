import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './FutureAuctionCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import FutureAuctionCard from './FutureAuctionCard.jsx';

const FutureAuctionsList = ({ data, loading, removeAuction }) => (
  <div className="future__auctions__list">
    {data.map((auction) => (
      <Animated animationIn="fadeIn" key={auction.id}>
        {loading ? (
          <AuctionsCardSkeleton variant="future" />
        ) : (
          <FutureAuctionCard auction={auction} removeAuction={removeAuction} />
        )}
      </Animated>
    ))}
  </div>
);

FutureAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loading: PropTypes.bool.isRequired,
  removeAuction: PropTypes.func,
};

FutureAuctionsList.defaultProps = {
  removeAuction: () => {},
};

export default FutureAuctionsList;
