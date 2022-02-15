import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './ActiveAuctionCard.scss';
import ActiveAuctionCard from './ActiveAuctionCard.jsx';

const ActiveAuctionsList = ({ data, removeAuction }) => (
  <div className="active__auctions__list">
    {data.map((auction) => {
      if (!auction.depositedNfts) {
        return <></>;
      }
      return (
        <Animated animationIn="fadeIn" key={auction.id}>
          <ActiveAuctionCard auction={auction} removeAuction={removeAuction} />{' '}
        </Animated>
      );
    })}
  </div>
);

ActiveAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  removeAuction: PropTypes.func,
};

ActiveAuctionsList.defaultProps = {
  removeAuction: () => {},
};

export default ActiveAuctionsList;
