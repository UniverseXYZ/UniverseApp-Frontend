import React from 'react';
import FutureAuctionsFilters from './Filters.jsx';
import FutureAuctionsCard from '../../../../auctionsCard/FutureAuctionsCard.jsx';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';
import { isAfterNow } from '../../../../../utils/dates';

const FutureAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();
  return (
    <div className="future__auctions__tab">
      {myAuctions.filter((item) => !item.launch && isAfterNow(item.endDate)).length ? (
        <>
          <FutureAuctionsFilters />
          <FutureAuctionsCard
            data={myAuctions.filter((item) => !item.launch && isAfterNow(item.endDate))}
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
