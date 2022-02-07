import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import bubbleIcon from '../../../../assets/images/text-bubble.png';
import Button from '../../../button/Button';
import plusIcon from '../../../../assets/images/PlusIcon.png';
import NFTCard from '../../../nft/NFTCard';
import { getUserCollections } from '../../../../utils/api/mintNFT';
import ApiSearchFilters from '../../../nft/ApiSearchFilters';
import NftCardSkeleton from '../../../skeletons/nftCardSkeleton/NftCardSkeleton';
import ApiPagination from '../../../pagination/ApiPagination';
import ApiItemsPerPageDropdown from '../../../pagination/ApiItemsPerPageDropdown';
import { useSearchUserNfts } from '../../../../utils/hooks/useUserProfilePageDebouncer.js';
import { CollectionPageLoader } from '../../../../containers/collection/CollectionPageLoader';
import { useMyNftsContext } from '../../../../contexts/MyNFTsContext';

const NFTsTab = React.memo(({ showMintPrompt, username, artistAddress, scrollToTop }) => {
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const history = useHistory();

  const { setUserPageNftsCount } = useMyNftsContext();

  const {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    search,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    collections,
    setCollections,
  } = useSearchUserNfts(username);

  const [shownNFTs, setShownNFTs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(0);

  const getMyCollections = async () => {
    if (artistAddress) {
      try {
        const all = await getUserCollections(artistAddress);
        setAllCollections(all.collections);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // Load all collections for the user
    getMyCollections();
  }, [artistAddress]);

  useEffect(() => {
    if (results.pagination) {
      setUserPageNftsCount(results.pagination.totalCount || 0);
      setShownNFTs(results);
      setIsSearching(false);
    }
  }, [results]);

  const resetPagination = () => {
    setOffset(0);
    setPage(0);
    setApiPage(0);
    setIsSearching(true);
  };

  useEffect(() => {
    resetPagination();
  }, [collections]);

  const changePerPage = (newPerPage) => {
    if (newPerPage < shownNFTs?.nfts.length) {
      setPage(0);
      setOffset(0);
    } else {
      const newPage = Math.ceil(offset / newPerPage);
      setPage(newPage);
    }
    setPerPage(newPerPage);
  };

  useEffect(() => {
    scrollToTop();
  }, [page, perPage]);

  return (
    <>
      <ApiSearchFilters
        searchText={inputText}
        search={setInputText}
        resetPagination={resetPagination}
        selectedCollections={collections}
        setSelectedCollections={setCollections}
        allCollections={allCollections}
      />
      {isSearching ? (
        <div className="nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : shownNFTs?.nfts && shownNFTs?.nfts.length ? (
        <>
          <div className="nfts__lists">
            {shownNFTs?.nfts
              .slice(offset, offset + perPage)
              .filter((nft) => !nft.hidden)
              .map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
          </div>
          {isLastPage && <CollectionPageLoader />}

          <div className="pagination__container">
            <ApiPagination
              data={shownNFTs?.nfts}
              perPage={perPage}
              setOffset={setOffset}
              setApiPage={setApiPage}
              apiPage={apiPage}
              setIsLastPage={setIsLastPage}
              page={page}
              setPage={setPage}
              loadedPages={loadedPages}
              setLoadedPages={setLoadedPages}
              pagination={shownNFTs?.pagination}
            />
            <ApiItemsPerPageDropdown
              perPage={perPage}
              itemsPerPage={[8, 16, 32]}
              offset={offset}
              page={page}
              changePerPage={changePerPage}
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
});

NFTsTab.propTypes = {
  showMintPrompt: PropTypes.bool,
  username: PropTypes.string.isRequired,
  artistAddress: PropTypes.string.isRequired,
  scrollToTop: PropTypes.func.isRequired,
};

NFTsTab.defaultProps = {
  showMintPrompt: true,
};

export default NFTsTab;
