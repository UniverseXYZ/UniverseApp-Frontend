import { useState } from 'react';
import { useLocation } from 'react-router';
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import FutureAuctionsList from './FutureAuctionsList';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../../utils/fixtures/FutureAuctionsDummyData';

const FutureAuctionsTab = () => {
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const artistFutureAuctions = PLACEHOLDER_FUTURE_AUCTIONS.filter(
    (auction) => auction.artist.id === location.state.id
  );

  return artistFutureAuctions.length ? (
    <>
      <FutureAuctionsList data={artistFutureAuctions} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={artistFutureAuctions} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </>
  ) : (
    <div className="empty__nfts">
      <h3>No future auctions found</h3>
    </div>
  );
};

export default FutureAuctionsTab;
