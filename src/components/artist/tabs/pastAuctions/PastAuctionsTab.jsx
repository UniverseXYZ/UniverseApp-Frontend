import { useState } from 'react';
import { useLocation } from 'react-router';
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import PastAuctionsList from './PastAuctionsList';
import { PLACEHOLDER_PAST_AUCTIONS } from '../../../../utils/fixtures/PastAuctionsDummyData';

const PastAuctionsTab = () => {
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const artistPastAuctions = PLACEHOLDER_PAST_AUCTIONS.filter(
    (auction) => auction.artist.id === location.state.id
  );

  return artistPastAuctions.length ? (
    <>
      <PastAuctionsList data={artistPastAuctions} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={artistPastAuctions} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </>
  ) : (
    <div className="empty__nfts">
      <h3>No past auctions found</h3>
    </div>
  );
};

export default PastAuctionsTab;
