import React, { useState, useEffect, useRef } from 'react';
import '../pagination/Pagination.scss';
import '../marketplace/browseNFT/NFTsList.scss';
import NFTCard from '../nft/NFTCard';
import PendingNFTs from './pendingDropdown/pendingNFTs/PendingNFTs';
import NftCardSkeleton from '../skeletons/nftCardSkeleton/NftCardSkeleton';
import { useSearchMyNfts } from '../../utils/hooks/useMyNftsPageDebouncer.js';
import ApiSearchFilters from '../nft/ApiSearchFilters.jsx';
import ApiPagination from '../pagination/ApiPagination.jsx';
import ApiItemsPerPageDropdown from '../pagination/ApiItemsPerPageDropdown.jsx';
import { CollectionPageLoader } from '../../containers/collection/CollectionPageLoader.jsx';
import NoNftsFound from './NoNftsFound.jsx';
import {
  getMyMintedCollections,
  getMyMintingNfts,
  getMyMintingNftsCount,
} from '../../utils/api/mintNFT';

const Wallet = React.memo(() => {
  const [perPage, setPerPage] = useState(8);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  const [shownNFTs, setShownNFTs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    setOffset(0);
  }, [perPage]);

  const {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
    collections,
    setCollections,
    mintingNfts,
    setMintingNfts,
    mintingNftsCount,
    setMintingNftsCount,
  } = useSearchMyNfts();

  const getMyCollections = async () => {
    try {
      const all = await getMyMintedCollections(0, 1000);
      setAllCollections(all.collections);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load all collections for the user
    getMyCollections();
  }, []);

  // We need this otherwise after updating my nfts with
  // the newly minted ones from the polling mechanism
  // the component won't rerender and show the new ones
  useEffect(() => {
    if (results.nfts) {
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

  let nftPollInterval = null;
  const pollingInterval = 10000;

  useEffect(() => {
    if (mintingNftsCount && !nftPollInterval) {
      // setTimeout(async () => {
      //   // We need to wait a bit as the API isn't fast enough
      // let [myNfts, mintingNftsCount] = await Promise.all([getMyNfts(), getMyMintingNftsCount()]);
      // setMyNFTs(myNfts);
      // setMyMintingNFTs(mintingNfts);
      nftPollInterval = setInterval(async () => {
        const nftCount = await getMyMintingNftsCount();
        if (nftCount !== mintingNftsCount) {
          const nfts = await getMyMintingNfts();
          setMintingNftsCount(nfts.mintingNfts.length);
          setMintingNfts(nfts.mintingNfts);

          if (!nfts?.length || nfts.length === 0) {
            clearInterval(nftPollInterval);
          }
        }
      }, pollingInterval);
      // }, 1000);
    } else if (!mintingNftsCount && nftPollInterval) {
      clearInterval(nftPollInterval);
    }
  }, [mintingNftsCount]);

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

  return (
    <div className="tab__wallet">
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
          <PendingNFTs mintingNfts={mintingNfts} />
          {shownNFTs?.nfts && shownNFTs?.nfts.length ? (
            <>
              <div className="nfts__lists">
                {shownNFTs?.nfts.slice(offset, offset + perPage).map((nft) => (
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
          ) : (
            <></>
          )}
        </>
      ) : (
        <NoNftsFound />
      )}
    </div>
  );
});

// Wallet.propTypes = {
//   myNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
//   myNftsLoading: PropTypes.bool.isRequired,
//   myMintingNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
// };
export default Wallet;
