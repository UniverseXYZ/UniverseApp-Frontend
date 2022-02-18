import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { utils } from 'ethers';
import bubbleIcon from '../../../../assets/images/text-bubble.png';
import Button from '../../../button/Button';
import plusIcon from '../../../../assets/images/PlusIcon.png';
import NFTCard from '../../../nft/NFTCard';
import { getUserCollections } from '../../../../utils/api/mintNFT';
import NftCardSkeleton from '../../../skeletons/nftCardSkeleton/NftCardSkeleton';
import { CollectionPageLoader } from '../../../../containers/collection/CollectionPageLoader';
import { useAuthContext } from '../../../../contexts/AuthContext';
import LoadMore from '../../../pagination/LoadMore';
import { useErrorContext } from '../../../../contexts/ErrorContext';
import { getNftsPerAddress } from '../../../../utils/api/marketplace';

const PER_PAGE = 12;

const NFTsTab = React.memo(({ showMintPrompt, artistAddress }) => {
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const history = useHistory();
  const { address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const [shownNFTs, setShownNFTs] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    // Load all collections for the user
    getMyCollections();
  }, [artistAddress]);

  useEffect(async () => {
    setShowSpinner(true);
    getMyNfts();
  }, [page, address]);

  let loadMoreButton = null;

  if (showLoadMore) {
    loadMoreButton = <LoadMore page={page} setPage={setPage} pageAndSize />;
  }

  return (
    <>
      {showSkeleton ? (
        <div className="nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : shownNFTs?.length ? (
        <>
          <div className="nfts__lists">
            {shownNFTs?.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
          {showSpinner ? <CollectionPageLoader /> : loadMoreButton}
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
  artistAddress: PropTypes.string.isRequired,
};

NFTsTab.defaultProps = {
  showMintPrompt: true,
};

export default NFTsTab;
