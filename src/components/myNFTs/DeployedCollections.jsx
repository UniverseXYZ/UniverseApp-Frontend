import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import PendingCollections from './pendingDropdown/pendingCollections/PendingCollections';
import universeIcon from '../../assets/images/universe-img.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { shortenEthereumAddress } from '../../utils/helpers/format';
import { useSearchMyCollections } from '../../utils/hooks/useMyCollectionsPageDebouncer';
import CollectionCardSkeleton from '../skeletons/collectionCardSkeleton/CollectionCardSkeleton';
import NoCollectionsFound from './NoCollectionsFound';
import ApiPagination from '../pagination/ApiPagination';
import ApiItemsPerPageDropdown from '../pagination/ApiItemsPerPageDropdown';
import { getMyMintingCollectionsCount, getMyMintingCollections } from '../../utils/api/mintNFT';

const CORE_COLLECTION_ADDRESS = process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS;

const pollingInterval = 1000;

const DeployedCollections = ({ scrollContainer }) => {
  const history = useHistory();
  const { fetchNftSummary } = useMyNftsContext();

  const coreCollectionFirst = (a, b) => {
    if (a.address === CORE_COLLECTION_ADDRESS) {
      return -1;
    }

    return 1;
  };

  const [perPage, setPerPage] = useState(8);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [isSearching, setIsSearching] = useState(true);
  const [collectionData, setCollectionData] = useState(null);
  const [collPoll, setCollPoll] = useState(null);
  const collPollRef = useRef(null);

  // Update ref so that the cleanup function works
  useEffect(() => {
    collPollRef.current = collPoll;
  }, [collPoll]);

  const {
    apiPage,
    setApiPage,
    search,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    mintingCollectionsCount,
    setMintingCollectionsCount,
    mintingCollections,
    setMintingCollections,
  } = useSearchMyCollections();

  useEffect(() => {
    if (results?.collections) {
      setCollectionData(results);
      setIsSearching(false);
    }
  }, [results]);

  const changePerPage = (newPerPage) => {
    if (newPerPage < collectionData?.collections?.length) {
      setPage(0);
      setOffset(0);
    } else {
      const newPage = Math.ceil(offset / newPerPage);
      setPage(newPage);
    }
    setPerPage(newPerPage);
  };

  useEffect(() => {
    if (mintingCollectionsCount && !collPollRef.current) {
      setCollPoll(
        setInterval(async () => {
          const apiMintingCount = await getMyMintingCollectionsCount();
          if (apiMintingCount !== mintingCollectionsCount) {
            const currentlyMinting = await getMyMintingCollections();
            setMintingCollections(currentlyMinting.collections);
            setMintingCollectionsCount(currentlyMinting?.collections?.length || 0);
            fetchNftSummary();
            if (
              !currentlyMinting?.collections?.length ||
              currentlyMinting?.collections?.length === 0
            ) {
              clearInterval(collPollRef.current);
            }
          }
        }, pollingInterval)
      );
    } else if (!mintingCollectionsCount && collPollRef.current) {
      clearInterval(collPollRef.current);
    }

    return () => {
      clearInterval(collPollRef.current);
    };
  }, [mintingCollectionsCount]);

  const collectionsContainerRef = useRef(null);

  const scrollToCollectionsContainer = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToCollectionsContainer();
  }, [page, perPage]);

  return (
    <div className="tab__saved__collections" ref={collectionsContainerRef}>
      <PendingCollections myMintingCollections={mintingCollections} />
      {isSearching ? (
        <div className="saved__collections__lists">
          <CollectionCardSkeleton />
          <CollectionCardSkeleton />
          <CollectionCardSkeleton />
          <CollectionCardSkeleton />
        </div>
      ) : collectionData?.collections && collectionData?.collections.length ? (
        <>
          <div className="saved__collections__lists">
            {collectionData?.collections
              .sort(coreCollectionFirst)
              .slice(offset, offset + perPage)
              .map((collection, index) => (
                <div
                  className="saved__collection__box"
                  key={collection.id}
                  aria-hidden="true"
                  onClick={() =>
                    history.push(`/collection/${collection.address}`, {
                      collection,
                      saved: true,
                    })
                  }
                >
                  <div className="saved__collection__box__header">
                    {collection.bannerUrl ? (
                      <img src={collection.bannerUrl} alt={collection.name} />
                    ) : typeof collection.previewImage === 'string' &&
                      collection.previewImage.startsWith('#') ? (
                      <div
                        className="random__bg__color"
                        style={{ backgroundColor: collection.previewImage }}
                      />
                    ) : collection.coverUrl ? (
                      <img className="blur" src={collection.coverUrl} alt={collection.name} />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: getCollectionBackgroundColor(collection),
                        }}
                      />
                    )}
                  </div>
                  <div className="saved__collection__box__body">
                    {collection.address ===
                    process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                      <img
                        className="collection__avatar"
                        src={universeIcon}
                        alt={collection.name}
                      />
                    ) : !collection.coverUrl ? (
                      <div
                        className="random__avatar__color"
                        style={{
                          backgroundColor: getCollectionBackgroundColor(collection),
                        }}
                      >
                        {collection.name.charAt(0)}
                      </div>
                    ) : (
                      <img
                        className="collection__avatar"
                        src={collection.coverUrl}
                        alt={collection.name}
                      />
                    )}
                    {collection?.name ? (
                      <h3 title={collection.name} className="collection__name">
                        {collection.name.length > 32
                          ? `${collection.name.substring(0, 32)}...`
                          : collection.name}
                      </h3>
                    ) : (
                      <h3 title={collection.address} className="collection__name">
                        {shortenEthereumAddress(collection.address)}
                      </h3>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {isLastPage && (
            <>
              <CollectionCardSkeleton />
              <CollectionCardSkeleton />
              <CollectionCardSkeleton />
              <CollectionCardSkeleton />
            </>
          )}

          <div className="pagination__container">
            <ApiPagination
              data={collectionData?.collections}
              perPage={perPage}
              setOffset={setOffset}
              setApiPage={setApiPage}
              apiPage={apiPage}
              setIsLastPage={setIsLastPage}
              page={page}
              setPage={setPage}
              loadedPages={loadedPages}
              setLoadedPages={setLoadedPages}
              pagination={collectionData?.pagination}
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
      ) : (
        <NoCollectionsFound />
      )}
    </div>
  );
};
DeployedCollections.propTypes = {
  scrollContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default DeployedCollections;
