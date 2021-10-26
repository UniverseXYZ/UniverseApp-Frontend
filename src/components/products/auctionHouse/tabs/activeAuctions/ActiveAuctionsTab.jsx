import React from 'react';
import ActiveAuctionsFilters from './Filters.jsx';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';
import { isAfterNow } from '../../../../../utils/dates';
import { PLACEHOLDER_AUCTIONS } from '../../../../../utils/fixtures/AuctionsDummyData.js';
import ActiveAuctionsList from '../../../../auctionsCard/activeAuction/ActiveAuctionsList.jsx';

const ActiveAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();

  return (
    <div className="active__auctions__tab">
      {PLACEHOLDER_AUCTIONS.filter((item) => isAfterNow(item.endDate)).length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsList
            data={PLACEHOLDER_AUCTIONS.filter((item) => isAfterNow(item.endDate))}
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
