import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FutureAuctionsFilters from './Filters.jsx';
import { isAfterNow } from '../../../../../utils/dates';
import FutureAuctionsList from '../../../../auctionsCard/futureAuction/FutureAuctionsList.jsx';
import Pagination from '../../../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown.jsx';

const FutureAuctionsTab = ({ auctions, loading }) => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="future__auctions__tab">
      {auctions.length ? (
        <>
          <FutureAuctionsFilters />
          <FutureAuctionsList data={auctions} loading={loading} />
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
          <h3>No future auctions found</h3>
        </div>
      )}
    </div>
  );
};

FutureAuctionsTab.propTypes = {
  auctions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FutureAuctionsTab;
