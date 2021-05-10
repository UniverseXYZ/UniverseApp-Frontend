import React, { useState, useContext } from 'react';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown';
import Pagination from '../../../../pagination/Pagionation';
import ActiveAuctionsList from './ActiveAuctionsList';
import ActiveAuctionsFilters from './Filters';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../../utils/fixtures/ActiveAuctionsDummyData';
import AppContext from '../../../../../ContextAPI';

const ActiveAuctionsTab = () => {
  const { activeAuctions } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  console.log('******', activeAuctions);

  return (
    <div className="active__auctions__tab">
      {activeAuctions.length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsList data={activeAuctions} perPage={perPage} offset={offset} />
          <div className="pagination__container">
            <Pagination data={activeAuctions} perPage={perPage} setOffset={setOffset} />
            <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
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
