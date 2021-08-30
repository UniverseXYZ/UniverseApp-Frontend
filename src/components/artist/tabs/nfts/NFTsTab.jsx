import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NFTsList from './NFTsList';
import { PLACEHOLDER_NFTS } from '../../../../utils/fixtures/NFTsDummyData';
import NFTsFilters from './Filters.jsx';
import Pagination from '../../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown.jsx';
import AppContext from '../../../../ContextAPI';
import bubbleIcon from '../../../../assets/images/text-bubble.png';
import Button from '../../../button/Button';
import plusIcon from '../../../../assets/images/PlusIcon.png';

const NFTsTab = ({ onArtist }) => {
  const { loggedInArtist, myNFTs } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const data = loggedInArtist.id === onArtist.id ? myNFTs : PLACEHOLDER_NFTS;
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const history = useHistory();

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
      <div className="tabs-empty">
        <div className="image-bubble">
          <img src={bubbleIcon} alt="bubble-icon" />
        </div>
        <h3>No NFTs found</h3>
        <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
        <Button
          ref={ref}
          className={`create--nft--dropdown  ${isDropdownOpened ? 'opened' : ''} light-button`}
          onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          aria-hidden="true"
        >
          Create
          <img src={plusIcon} alt="icon" />
          {isDropdownOpened && (
            <div className="sort__share__dropdown">
              <ul>
                <li
                  aria-hidden="true"
                  onClick={() =>
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                  }
                >
                  NFT
                </li>
                <li
                  aria-hidden="true"
                  onClick={() =>
                    history.push('/my-nfts/create', {
                      tabIndex: 1,
                      nftType: 'collection',
                    })
                  }
                >
                  Collection
                </li>
              </ul>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

NFTsTab.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NFTsTab;
