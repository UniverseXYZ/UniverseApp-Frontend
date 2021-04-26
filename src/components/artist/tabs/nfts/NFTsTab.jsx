import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import NFTsList from './NFTsList';
import { PLACEHOLDER_NFTS } from '../../../../utils/fixtures/NFTsDummyData';
import NFTsFilters from './Filters';
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import AppContext from '../../../../ContextAPI';

const NFTsTab = ({ onArtist }) => {
  const { loggedInArtist, myNFTs } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const data = loggedInArtist.id === onArtist.id ? myNFTs : PLACEHOLDER_NFTS;

  return data.length ? (
    <>
      <NFTsFilters />
      <NFTsList data={data} perPage={perPage} offset={offset} />
      <div className="pagination__container">
        <Pagination data={data} perPage={perPage} setOffset={setOffset} />
        <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </>
  ) : (
    <div className="empty__nfts">
      <h3>No NFTs found</h3>
    </div>
  );
};

NFTsTab.propTypes = {
  onArtist: PropTypes.object,
};

export default NFTsTab;
