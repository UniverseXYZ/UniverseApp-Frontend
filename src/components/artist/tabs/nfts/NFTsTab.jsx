import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PLACEHOLDER_NFTS } from '../../../../utils/fixtures/NFTsDummyData';
import NFTsFilters from './Filters.jsx';
import AppContext from '../../../../ContextAPI';
import bubbleIcon from '../../../../assets/images/text-bubble.png';
import Button from '../../../button/Button';
import plusIcon from '../../../../assets/images/PlusIcon.png';
import LoadMore from '../../../pagination/LoadMore';
import NFTCard from '../../../nft/NFTCard';

const NFTsTab = ({ onArtist }) => {
  const { loggedInArtist, myNFTs } = useContext(AppContext);
  const data = loggedInArtist.id === onArtist.id ? myNFTs : PLACEHOLDER_NFTS;
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const history = useHistory();
  const [quantity, setQuantity] = useState(2);

  return data.length ? (
    <>
      <NFTsFilters />
      <div className="nfts__lists">
        {data
          .filter((nft) => !nft.hidden)
          .map((nft, index) => index < quantity && <NFTCard key={nft.id} nft={nft} />)}
      </div>
      {data.filter((nft) => !nft.hidden).length >= quantity && (
        <LoadMore quantity={quantity} setQuantity={setQuantity} perPage={2} />
      )}
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
