import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './MyBidCard.scss';
import AuctionsCardSkeleton from '../skeleton/AuctionsCardSkeleton.jsx';
import MyBidCard from './MyBidCard.jsx';
import { getMyBids } from '../../../utils/api/auctions';
import NoAuctionsFound from '../../auctions/NoAuctionsFound';

const MyBidsList = () => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [myBids, setMyBids] = useState([]);

  useEffect(async () => {
    try {
      const response = await getMyBids();
      if (!response.bids?.length) {
        setNotFound(true);
      } else {
        setMyBids(response.bids);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <div className="my--bids--list">
        {loading ? (
          <>
            <AuctionsCardSkeleton />
            <AuctionsCardSkeleton />
            <AuctionsCardSkeleton />
          </>
        ) : (
          myBids.map((bid) => (
            <Animated animationIn="fadeIn" key={uuid()}>
              <MyBidCard bid={bid} />
            </Animated>
          ))
        )}
      </div>
      {notFound && (
        <div>
          <NoAuctionsFound
            title="No bids found"
            desc="Explore the auctions by clicking the button below"
            btnText="Auction house"
            btnAction="/products/auction-house"
          />
        </div>
      )}
    </>
  );
};

export default MyBidsList;
