import React, { useState } from 'react';
import ActiveAuctionsFilters from './Filters.jsx';
import { useAuctionContext } from '../../../../../contexts/AuctionContext.jsx';
import { isAfterNow } from '../../../../../utils/dates';
import { PLACEHOLDER_AUCTIONS } from '../../../../../utils/fixtures/AuctionsDummyData.js';
import ActiveAuctionsList from '../../../../auctionsCard/activeAuction/ActiveAuctionsList.jsx';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import Pagination from '../../../../pagination/Pagionation.jsx';

const ActiveAuctionsTab = () => {
  const { myAuctions } = useAuctionContext();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="active__auctions__tab">
      {PLACEHOLDER_AUCTIONS.filter((item) => isAfterNow(item.endDate)).length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsList
            data={PLACEHOLDER_AUCTIONS.filter((item) => isAfterNow(item.endDate))}
          />
          <div className="pagination__container">
            <Pagination
              data={PLACEHOLDER_AUCTIONS.filter((item) => isAfterNow(item.endDate))}
              perPage={perPage}
              setOffset={setOffset}
            />
            <ItemsPerPageDropdown
              perPage={perPage}
              setPerPage={setPerPage}
              itemsPerPage={[12, 24]}
            />
          </div>
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
