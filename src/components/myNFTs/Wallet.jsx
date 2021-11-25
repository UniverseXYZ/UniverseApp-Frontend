import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown.jsx';
import '../pagination/Pagination.scss';
import bubbleIcon from '../../assets/images/text-bubble.png';
import '../marketplace/browseNFT/NFTsList.scss';
import plusIcon from '../../assets/images/plus.svg';
import NFTCard from '../nft/NFTCard';
import SearchFilters from '../nft/SearchFilters';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import SimplePagination from '../pagination/SimplePaginations';
import PendingNFTs from './pendingDropdown/pendingNFTs/PendingNFTs';
import NftCardSkeleton from '../skeletons/nftCardSkeleton/NftCardSkeleton';

const Wallet = React.memo(() => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { myNFTs, myNftsLoading, myMintingNFTs } = useMyNftsContext();

  const [shownNFTs, setShownNFTs] = useState(myNFTs);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(8);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const refMobile = useRef(null);

  const history = useHistory();

  useEffect(() => {
    setOffset(0);
  }, [perPage]);

  // We need this otherwise after updating my nfts with
  // the newly minted ones from the polling mechanism
  // the component won't rerender and show the new ones
  useEffect(() => {
    setShownNFTs(myNFTs);
  }, [myNFTs]);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        refMobile.current &&
        !refMobile.current.contains(event.target)
      ) {
        setIsDropdownOpened(false);
      }
    }

    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="tab__wallet">
      {myNftsLoading ? (
        <div className="nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : myMintingNFTs.length || (myNFTs.length && myNFTs.filter((nft) => !nft.hidden).length) ? (
        <>
          <SearchFilters data={myNFTs} setData={setShownNFTs} setOffset={setOffset} />
          <PendingNFTs />
          {shownNFTs.length ? (
            <>
              <div className="nfts__lists">
                {shownNFTs
                  .slice(offset, offset + perPage)
                  .filter((nft) => !nft.hidden)
                  .map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
              </div>

              <div className="pagination__container">
                <SimplePagination
                  data={shownNFTs}
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
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="empty__nfts">
          <div className="tabs-empty">
            <div className="image-bubble">
              <img src={bubbleIcon} alt="bubble-icon" />
            </div>
            <h3>No NFTs found</h3>
            <h3 style={{ marginTop: 6 }}>
              If you&apos;re signing in for the first time, it may take a bit before your nfts are
              synced
            </h3>
            <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
            <button
              disabled
              type="button"
              ref={ref2}
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
                        history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                      }
                    >
                      Collection
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Wallet;
