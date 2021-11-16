import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound.jsx';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Title from '../../components/collection/Title.jsx';
import Description from '../../components/collection/Description.jsx';
import Button from '../../components/button/Button.jsx';
import pencilIcon from '../../assets/images/edit.svg';
import NFTCard from '../../components/nft/NFTCard.jsx';
import bubbleIcon from '../../assets/images/text-bubble.png';
import { getCollectionData } from '../../utils/api/mintNFT';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown.jsx';
import '../../components/pagination/Pagination.scss';
import ApiPagination from '../../components/pagination/ApiPagination.jsx';
import ApiCollectionSearchFilters from '../../components/nft/ApiCollectionSearchFilters.jsx';
import { useSearchCollection } from '../../utils/hooks/useCollectionPageDebouncer.js';
import RarityChartsLoader from '../rarityCharts/RarityChartsLoader.jsx';
import { renderLoaders } from '../rarityCharts/renderLoaders.js';
import { CollectionPageLoader } from './CollectionPageLoader.jsx';

const Collection = () => {
  const { setSavedCollectionID } = useMyNftsContext();
  const { address } = useAuthContext();
  const { setDarkMode } = useThemeContext();
  const { collectionAddress } = useParams();
  const location = useLocation();
  const history = useHistory();
  const ref = useRef(null);

  const {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    search: { loading },
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
  } = useSearchCollection(collectionAddress);

  const [collectionData, setCollectionData] = useState(null);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [ownersCount, setOwnersCount] = useState(0);

  useEffect(async () => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    if (results.collection) {
      setCollectionData(results);
      setIsSearching(false);
    }
  }, [results]);

  const handleEdit = (id) => {
    setSavedCollectionID(id);
    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
  };

  const resetPagination = () => {
    setOffset(0);
    setPage(0);
    setApiPage(0);
    setIsSearching(true);
  };

  return !collectionData ? (
    <div className="loader-wrapper">
      <CollectionPageLoader />
    </div>
  ) : collectionData ? (
    <div className="collection__page">
      <Cover selectedCollection={collectionData.collection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={collectionData.collection} />
          <Title
            selectedCollection={collectionData.collection}
            saved={location.state?.saved}
            nftsCount={collectionData?.pagination?.totalCount}
            ownersCount={ownersCount}
          />
        </div>
        <Description selectedCollection={collectionData.collection} />
        {address === collectionData?.collection?.owner ? (
          <div className="collection__edit">
            <Button
              className="light-border-button"
              onClick={() => handleEdit(collectionData.collection.id)}
            >
              <span>Edit</span>
              <img src={pencilIcon} alt="Edit Icon" />
            </Button>
          </div>
        ) : (
          <></>
        )}
        <div className="collection--nfts--container">
          <ApiCollectionSearchFilters
            searchText={inputText}
            search={setInputText}
            resetPagination={resetPagination}
          />

          {isSearching ? (
            <CollectionPageLoader />
          ) : collectionData?.nfts?.filter((nft) => !nft.hidden).length ? (
            <>
              <div className="nfts__lists">
                {collectionData?.nfts
                  .slice(offset, offset + perPage)
                  .filter((nft) => !nft.hidden)
                  .map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={{
                        ...nft,
                        collection: collectionData.collection,
                      }}
                      collectionAddress={collectionAddress}
                    />
                  ))}
              </div>

              {isLastPage ? <CollectionPageLoader /> : <></>}

              <div className="pagination__container">
                <ApiPagination
                  data={collectionData?.nfts}
                  perPage={perPage}
                  setOffset={setOffset}
                  setApiPage={setApiPage}
                  apiPage={apiPage}
                  setIsLastPage={setIsLastPage}
                  page={page}
                  setPage={setPage}
                  loadedPages={loadedPages}
                  setLoadedPages={setLoadedPages}
                  pagination={collectionData.pagination}
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
            <div className="empty__nfts">
              <div className="tabs-empty">
                <div className="image-bubble">
                  <img src={bubbleIcon} alt="bubble-icon" />
                </div>
                <h3>No NFTs found</h3>
                <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
                <Button
                  ref={ref}
                  className={`create--nft--dropdown  ${
                    isDropdownOpened ? 'opened' : ''
                  } light-button`}
                  onClick={() =>
                    history.push('/my-nfts/create', {
                      collection: collectionData.collection,
                      tabIndex: 1,
                      nftType: 'single',
                    })
                  }
                  aria-hidden="true"
                >
                  Create NFT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
