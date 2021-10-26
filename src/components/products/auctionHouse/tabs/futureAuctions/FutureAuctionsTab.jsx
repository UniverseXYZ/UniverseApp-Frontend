import React from 'react';
import FutureAuctionsFilters from './Filters.jsx';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';
import { isAfterNow } from '../../../../../utils/dates';
import { PLACEHOLDER_AUCTIONS } from '../../../../../utils/fixtures/AuctionsDummyData.js';
import FutureAuctionsList from '../../../../auctionsCard/futureAuction/FutureAuctionsList.jsx';

const FutureAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();

  return (
    <div className="future__auctions__tab">
      {PLACEHOLDER_AUCTIONS.filter((item) => !item.launch && isAfterNow(item.endDate)).length ? (
        <>
          <FutureAuctionsFilters />
          <FutureAuctionsList
            data={PLACEHOLDER_AUCTIONS.filter((item) => !item.launch && isAfterNow(item.endDate))}
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
