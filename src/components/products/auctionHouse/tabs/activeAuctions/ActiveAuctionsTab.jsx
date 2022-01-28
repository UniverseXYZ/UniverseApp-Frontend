import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActiveAuctionsFilters from './Filters.jsx';
import { isAfterNow } from '../../../../../utils/dates';
import ActiveAuctionsList from '../../../../auctionsCard/activeAuction/ActiveAuctionsList.jsx';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';
import Pagination from '../../../../pagination/Pagionation.jsx';

const ActiveAuctionsTab = ({ auctions, loading }) => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="active__auctions__tab">
      {auctions.length ? (
        <>
          <ActiveAuctionsFilters />
          <ActiveAuctionsList data={auctions} loading={loading} />
          <div className="pagination__container">
            <Pagination data={auctions} perPage={perPage} setOffset={setOffset} />
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

ActiveAuctionsTab.propTypes = {
  auctions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ActiveAuctionsTab;
