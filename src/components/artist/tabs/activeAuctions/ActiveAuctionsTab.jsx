import { useState } from 'react';
import { useLocation } from 'react-router';
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import ActiveAuctionsList from './ActiveAuctionsList';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../utils/fixtures/ActiveAuctionsDummyData';

const ActiveAuctionsTab = () => {
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
