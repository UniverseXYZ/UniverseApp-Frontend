import React, { useState } from 'react';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown';
import Pagination from '../../../../pagination/Pagionation';
import ActiveAuctionsList from './ActiveAuctionsList';
import ActiveAuctionsFilters from './Filters';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../../utils/fixtures/ActiveAuctionsDummyData';

const ActiveAuctionsTab = () => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="active__auctions__tab">
      <ActiveAuctionsFilters />
      <ActiveAuctionsList data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </div>
  );
};

export default ActiveAuctionsTab;
