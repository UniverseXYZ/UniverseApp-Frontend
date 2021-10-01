import React, { useContext } from 'react';
import moment from 'moment';
import FutureAuctionsFilters from './Filters.jsx';
import FutureAuctionsCard from '../../../../auctionsCard/FutureAuctionsCard.jsx';
import AppContext from '../../../../../ContextAPI.js';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';

const FutureAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();
  return (
    <div className="future__auctions__tab">
      {myAuctions.filter((item) => !item.launch && !moment(item.endDate).isBefore(moment.now()))
        .length ? (
        <>
          <FutureAuctionsFilters />
          <FutureAuctionsCard
            data={myAuctions.filter(
              (item) => !item.launch && !moment(item.endDate).isBefore(moment.now())
            )}
          />
        </>
      ) : (
        <div className="empty__nfts">
          <h3>No future auctions found</h3>
        </div>
      )}
    </div>
  );
};

export default FutureAuctionsTab;
