import React, { useState, useContext } from 'react';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import Pagination from '../../../../pagination/Pagionation.jsx';
import ActiveAuctionsList from './ActiveAuctionsList.jsx';
import ActiveAuctionsFilters from './Filters.jsx';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../../utils/fixtures/ActiveAuctionsDummyData';
import AppContext from '../../../../../ContextAPI';

const ActiveAuctionsTab = () => {
  const { activeAuctions } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="active__auctions__tab">
      {PLACEHOLDER_ACTIVE_AUCTIONS.length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsList
            data={PLACEHOLDER_ACTIVE_AUCTIONS}
            perPage={perPage}
            offset={offset}
          />
          <div className="pagination__container">
            <Pagination
              data={PLACEHOLDER_ACTIVE_AUCTIONS}
              perPage={perPage}
              setOffset={setOffset}
            />
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
