import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './FutureAuctionCard.scss';
import FutureAuctionCard from './FutureAuctionCard.jsx';

const FutureAuctionsList = ({ data, removeAuction }) => (
  <div className="future__auctions__list">
    {data.map((auction) => {
      if (!auction.depositedNfts) {
        return <></>;
      }
      return (
        <Animated animationIn="fadeIn" key={auction.id}>
          <FutureAuctionCard auction={auction} removeAuction={removeAuction} />
        </Animated>
      );
    })}
  </div>
);

FutureAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  removeAuction: PropTypes.func,
};

FutureAuctionsList.defaultProps = {
  removeAuction: () => {},
};

export default FutureAuctionsList;
