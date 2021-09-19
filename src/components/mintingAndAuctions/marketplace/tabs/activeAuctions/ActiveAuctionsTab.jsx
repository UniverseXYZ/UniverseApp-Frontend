import React, { useContext } from 'react';
import moment from 'moment';
import ActiveAuctionsFilters from './Filters.jsx';
import ActiveAuctionsCard from '../../../../auctionsCard/ActiveAuctionsCard.jsx';
import AppContext from '../../../../../ContextAPI';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';

const ActiveAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();

  return (
    <div className="active__auctions__tab">
      {myAuctions.filter((item) => item.launch && !moment(item.endDate).isBefore(moment.now()))
        .length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsCard
            data={myAuctions.filter(
              (item) => item.launch && !moment(item.endDate).isBefore(moment.now())
            )}
          />
        </>
      ) : (
        <div className="empty__nfts">
          <h3>No active auctions found</h3>
        </div>
      )}
    </div>
  );
};

export default ActiveAuctionsTab;
