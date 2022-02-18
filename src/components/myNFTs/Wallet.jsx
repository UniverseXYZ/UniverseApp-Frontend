import React, { useState, useEffect, useRef } from 'react';
import '../pagination/Pagination.scss';
import '../marketplace/browseNFT/NFTsList.scss';
import PropTypes from 'prop-types';
import { utils } from 'ethers';
import NFTCard from '../nft/NFTCard';
import PendingNFTs from './pendingDropdown/pendingNFTs/PendingNFTs';
import NftCardSkeleton from '../skeletons/nftCardSkeleton/NftCardSkeleton';
import { useSearchMyNfts } from '../../utils/hooks/useMyNftsPageDebouncer.js';
import ApiSearchFilters from '../nft/ApiSearchFilters.jsx';
import ApiPagination from '../pagination/ApiPagination.jsx';
import ApiItemsPerPageDropdown from '../pagination/ApiItemsPerPageDropdown.jsx';
import { CollectionPageLoader } from '../../containers/collection/CollectionPageLoader.jsx';
import NoNftsFound from './NoNftsFound.jsx';
import { useErrorContext } from '../../contexts/ErrorContext';
import {
  getMyMintedCollections,
  getMyMintingNfts,
  getMyMintingNftsCount,
} from '../../utils/api/mintNFT';
import { getNftsPerAddress } from '../../utils/api/datascraper';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadMore from '../pagination/LoadMore';

const pollingInterval = 10000;
const PER_PAGE = 12;

const Wallet = React.memo(({ scrollContainer }) => {
  const [page, setPage] = useState(1);

  const [shownNFTs, setShownNFTs] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [allCollections, setAllCollections] = useState([]);
  const { fetchNftSummary } = useMyNftsContext();
  const { address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const [nftPoll, setNftPoll] = useState(null);
  const pollRef = useRef(null);

  // // Update ref so that the cleanup function works
  // useEffect(() => {
  //   pollRef.current = nftPoll;
  // }, [nftPoll]);

  const {
    // inputText,
    // setInputText,
    // apiPage,
    // setApiPage,
    // results,
    // isLastPage,
    // setIsLastPage,
    // loadedPages,
    // setLoadedPages,
    // collections,
    // setCollections,
    mintingNfts,
    // setMintingNfts,
    // mintingNftsCount,
    // setMintingNftsCount,
  } = useSearchMyNfts();

  // const getMyCollections = async () => {
  //   try {
  //     const all = await getMyMintedCollections(0, 1000);
  //     setAllCollections(all.collections);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getMyNfts = async () => {
    if (address) {
      try {
        const response = await getNftsPerAddress(utils.getAddress(address), page, PER_PAGE);
        if (response.error) {
          const { error, message } = response;
          setErrorTitle(error);
          setErrorBody(message);
          setShowError(true);
          return;
        }
        setShowSkeleton(false);
        setShowSpinner(false);
        if (response.length) {
          const shownNFTsClone = [...shownNFTs, ...response];
          setShownNFTs(shownNFTsClone);
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // useEffect(async () => {
  //   // Load all collections for the user
  //   getMyCollections();
  // }, []);

  useEffect(async () => {
    setShowSpinner(true);
    getMyNfts();
  }, [page, address]);

  // useEffect(() => {
  //   resetPagination();
  // }, [collections]);

  // useEffect(() => {
  //   if (mintingNftsCount && !pollRef.current) {
  //     setNftPoll(
  //       setInterval(async () => {
  //         const nftCount = await getMyMintingNftsCount();
  //         if (nftCount !== mintingNftsCount) {
  //           const nfts = await getMyMintingNfts();
  //           setMintingNftsCount(nfts.mintingNfts.length);
  //           setMintingNfts(nfts.mintingNfts);
  //           fetchNftSummary();
  //           if (!nfts?.mintingNfts?.length || nfts?.mintingNfts?.length === 0) {
  //             clearInterval(pollRef.current);
  //           }
  //         }
  //       }, pollingInterval)
  //     );
  //   } else if (!mintingNftsCount && pollRef.current) {
  //     clearInterval(pollRef.current);
  //   }

  //   return () => {
  //     clearInterval(pollRef.current);
  //   };
  // }, [mintingNftsCount]);

  let loadMoreButton = null;

  if (showLoadMore) {
    loadMoreButton = <LoadMore page={page} setPage={setPage} pageAndSize />;
  }

  return (
    <div className="tab__wallet">
      {/* <ApiSearchFilters
        searchText={inputText}
        search={setInputText}
        resetPagination={resetPagination}
        selectedCollections={collections}
        setSelectedCollections={setCollections}
        allCollections={allCollections}
      /> */}

      {showSkeleton ? (
        <div className="nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : shownNFTs && shownNFTs.length ? (
        <>
          <PendingNFTs mintingNfts={mintingNfts} />
          {shownNFTs && shownNFTs.length ? (
            <>
              <div className="nfts__lists">
                {shownNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
              {showSpinner ? <CollectionPageLoader /> : loadMoreButton}
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

Wallet.propTypes = {
  scrollContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default Wallet;
