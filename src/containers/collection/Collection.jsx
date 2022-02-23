import React, { useContext, useEffect, useState, useRef } from 'react';
import { Contract } from 'ethers';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import Contracts from '../../contracts/contracts.json';
import NotFound from '../../components/notFound/NotFound.jsx';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Description from '../../components/collection/Description.jsx';
import Button from '../../components/button/Button.jsx';
import NFTCard from '../../components/nft/NFTCard.jsx';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import '../../components/pagination/Pagination.scss';
import ApiPagination from '../../components/pagination/ApiPagination.jsx';
import ApiCollectionSearchFilters from '../../components/nft/ApiCollectionSearchFilters.jsx';
import { useSearchCollection } from '../../utils/hooks/useCollectionPageDebouncer.js';
import { CollectionPageLoader } from './CollectionPageLoader.jsx';
import ApiItemsPerPageDropdown from '../../components/pagination/ApiItemsPerPageDropdown.jsx';
import SocialLinks from '../../components/collection/SocialLinks.jsx';
import EditIcon from '../../components/svgs/EditIcon.jsx';
import Statistics from '../../components/collection/Statistics.jsx';
import Tabs from '../../components/tabs/Tabs.jsx';
import EmptyData from '../../components/collection/EmptyData.jsx';

const Collection = () => {
  const tabs = ['Items', 'Description'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { address, signer } = useAuthContext();
  const { setDarkMode } = useThemeContext();
  const { collectionAddress } = useParams();
  const history = useHistory();
  const ref = useRef(null);

  const location = useLocation();

  const {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    search: { loading },
    results,
    notFound,
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
  const [collectionOwner, setCollectionOwner] = useState('');

  const nftsContainerRef = useRef(null);

  const fetchCollectionOwner = async () => {
    try {
      const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
      // We use the UniserveERC721Core ABI because it implements the Ownable interface
      const collectionContract = new Contract(
        collectionData.collection.address,
        contracts.UniverseERC721Core.abi,
        signer
      );

      const owner = await collectionContract.owner();
      setCollectionOwner(owner.toLowerCase());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    if (collectionData && collectionData.collection && collectionData.collection.address) {
      fetchCollectionOwner();
    }
  }, [collectionData]);

  useEffect(() => {
    if (results.collection) {
      setCollectionData(results);
      setIsSearching(false);
    }
  }, [results]);

  const handleEdit = (id) => {
    history.push('/my-nfts/create', {
      tabIndex: 1,
      nftType: 'collection',
      collection: collectionData?.collection,
    });
  };

  const scrollToNftContainer = () => {
    if (nftsContainerRef && nftsContainerRef.current) {
      nftsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const resetPagination = () => {
    setOffset(0);
    setPage(0);
    setApiPage(0);
    setIsSearching(true);
  };

  const changePerPage = (newPerPage) => {
    if (newPerPage < collectionData.length) {
      setPage(0);
      setOffset(0);
    } else {
      const newPage = Math.ceil(offset / newPerPage);
      setPage(newPage);
    }
    setPerPage(newPerPage);
  };

  useEffect(() => {
    scrollToNftContainer();
  }, [page, perPage]);

  return !collectionData && !notFound ? (
    <div className="loader-wrapper">
      <CollectionPageLoader />
    </div>
  ) : collectionData ? (
    <div className="collection__page">
      <Cover selectedCollection={collectionData.collection} />

      <div className="collection__details__section">
        <div className="collection__details__header">
          <div className="collection__details__header__tp">
            <div className="collection__details__header__tp__left">
              <Avatar selectedCollection={collectionData.collection} />
              <SocialLinks
                instagramLink={collectionData.collection.instagramLink || ''}
                siteLink={collectionData.collection.siteLink || ''}
                mediumLink={collectionData.collection.mediumLink || ''}
                discordLink={collectionData.collection.discordLink || ''}
                telegramLink={collectionData.collection.telegramLink || ''}
                twitterLink=""
              />
            </div>
            <div className="collection__details__header__tp__right">
              {address.toLowerCase() === collectionOwner ? ( //
                <div className="collection__vote__edit">
                  {/* <div>
                    <Button className="light-button">
                      <span>Vote</span>
                    </Button>
                  </div> */}
                  <div>
                    <Button
                      className="light-button"
                      onClick={() => handleEdit(collectionData.collection.id)}
                    >
                      <span>Edit</span>
                      <EditIcon />
                    </Button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="collection__details__header__bp">
            <Statistics
              nftsCount={collectionData?.pagination?.totalCount}
              ownersCount={ownersCount}
            />
          </div>
        </div>
        <div className="collection--nfts--container">
          <Tabs
            items={tabs.map((tab, index) => ({
              name: tab,
              active: selectedTabIndex === index,
              handler: setSelectedTabIndex.bind(this, index),
            }))}
          />
          {selectedTabIndex === 0 ? (
            <>
              <ApiCollectionSearchFilters
                searchText={inputText}
                search={setInputText}
                resetPagination={resetPagination}
              />
              {isSearching ? (
                <CollectionPageLoader />
              ) : collectionData?.nfts?.filter((nft) => !nft.hidden).length ? (
                <>
                  <div className="nfts__lists" ref={nftsContainerRef}>
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
                <EmptyData text="No items found" />
              )}
            </>
          ) : selectedTabIndex === 1 ? (
            <>
              {collectionData.collection.description ? (
                <Description selectedCollection={collectionData.collection} />
              ) : (
                <EmptyData text="This collection doesn’t have a description yet" />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
