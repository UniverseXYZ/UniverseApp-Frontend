import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bubbleIcon from '../../../../assets/images/text-bubble.png';
import Button from '../../../button/Button';
import plusIcon from '../../../../assets/images/PlusIcon.png';
import NFTCard from '../../../nft/NFTCard';
import SearchFilters from '../../../nft/SearchFilters';
import SimplePagination from '../../../pagination/SimplePaginations';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';

function nftsTabPropsAreEqual(prevProps, nextProps) {
  if (prevProps.showMintPrompt !== nextProps.showMintPrompt) {
    return false;
  }
  return JSON.stringify(prevProps.nftData) === JSON.stringify(nextProps.nftData);
}

const NFTsTab = React.memo(({ nftData, showMintPrompt }) => {
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setNfts(nftData);
  }, [nftData]);

  return (
    <>
      <SearchFilters data={nftData} setData={setNfts} setOffset={setOffset} />
      {nfts.length ? (
        <>
          <div className="nfts__lists">
            {nfts
              .slice(offset, offset + perPage)
              .filter((nft) => !nft.hidden)
              .map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
          </div>
          <div className="pagination__container">
            <SimplePagination
              data={nfts}
              perPage={perPage}
              setOffset={setOffset}
              setPage={setPage}
              page={page}
            />
            <ItemsPerPageDropdown
              perPage={perPage}
              setPerPage={setPerPage}
              itemsPerPage={[8, 16, 32]}
              offset={offset}
              page={page}
              setPage={setPage}
            />
          </div>
        </>
      ) : showMintPrompt ? (
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
      ) : (
        <div className="empty__nfts">
          <div className="tabs-empty">
            <div className="image-bubble">
              <img src={bubbleIcon} alt="bubble-icon" />
            </div>
            <h3>No NFTs found</h3>
          </div>
        </div>
      )}
    </>
  );
}, nftsTabPropsAreEqual);

NFTsTab.propTypes = {
  nftData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  showMintPrompt: PropTypes.bool,
};

NFTsTab.defaultProps = {
  showMintPrompt: true,
};

export default NFTsTab;
