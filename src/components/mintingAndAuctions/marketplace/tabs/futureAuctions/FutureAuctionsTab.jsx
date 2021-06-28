import React, { useState } from 'react';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import Pagination from '../../../../pagination/Pagionation.jsx';
import FutureAuctionsFilters from './Filters.jsx';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../../../utils/fixtures/FutureAuctionsDummyData';
import FutureAuctionsList from './FutureAuctionsList';

const FutureAuctionsTab = () => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="future__auctions__tab">
      <FutureAuctionsFilters />
      <FutureAuctionsList data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </div>
  );
};

export default FutureAuctionsTab;
