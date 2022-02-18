import React, { useState, useEffect } from 'react';
import '../pagination/Pagination.scss';
import '../marketplace/browseNFT/NFTsList.scss';
import { utils } from 'ethers';
import NFTCard from '../nft/NFTCard';
import NftCardSkeleton from '../skeletons/nftCardSkeleton/NftCardSkeleton';
import { CollectionPageLoader } from '../../containers/collection/CollectionPageLoader.jsx';
import NoNftsFound from './NoNftsFound.jsx';
import { useErrorContext } from '../../contexts/ErrorContext';
import { getNftsPerAddress } from '../../utils/api/marketplace.ts';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadMore from '../pagination/LoadMore';

const PER_PAGE = 12;

const Wallet = React.memo(() => {
  const [page, setPage] = useState(1);

  const [shownNFTs, setShownNFTs] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const { address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

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

  useEffect(async () => {
    setShowSpinner(true);
    getMyNfts();
  }, [page, address]);

  let loadMoreButton = null;

  if (showLoadMore) {
    loadMoreButton = <LoadMore page={page} setPage={setPage} pageAndSize />;
  }

  return (
    <div className="tab__wallet">
      {showSkeleton ? (
        <div className="nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : shownNFTs && shownNFTs.length ? (
        <>
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

export default Wallet;
