import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown.jsx';
import ActiveAuctionsList from './ActiveAuctionsList.jsx';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../utils/fixtures/ActiveAuctionsDummyData';
import AppContext from '../../../../ContextAPI.js';

const ActiveAuctionsTab = () => {
  const { myAuctions, activeAuctions, futureAuctions } = useContext(AppContext);
  console.log('myAuctions', myAuctions);
  console.log('activeAuctions', activeAuctions);
  console.log('futureAuctions', futureAuctions);
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const artistActiveAuctions = PLACEHOLDER_ACTIVE_AUCTIONS.filter(
    (auction) => auction.artist.id === location.state.id
  );

  return artistActiveAuctions.length ? (
    <>
      <ActiveAuctionsList data={artistActiveAuctions} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={artistActiveAuctions} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </>
  ) : (
    <div className="empty__nfts">
      <h3>No active auctions found</h3>
    </div>
  );
};

export default ActiveAuctionsTab;
