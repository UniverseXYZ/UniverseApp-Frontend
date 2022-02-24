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
import { getCollectionData } from '../../utils/api/marketplace.ts';
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
import LoadMore from '../../components/pagination/LoadMore';

const Collection = () => {
  const tabs = ['Items', 'Description'];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { address, signer } = useAuthContext();
  const { setDarkMode } = useThemeContext();
  const { collectionAddress } = useParams();
  const history = useHistory();
  const ref = useRef(null);

  const location = useLocation();

  // const {
  //   inputText,
  //   setInputText,
  //   apiPage,
  //   setApiPage,
  //   search: { loading },
  //   results,
  //   notFound,
  //   isLastPage,
  //   setIsLastPage,
  //   loadedPages,
  //   setLoadedPages,
  // } = useSearchCollection(collectionAddress);

  const [collectionData, setCollectionData] = useState(null);
  const [collectionNfts, setCollectionNfts] = useState(null);
  const [page, setPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [ownersCount, setOwnersCount] = useState(0);
  const [collectionOwner, setCollectionOwner] = useState('');

  const nftsContainerRef = useRef(null);

  const getCollection = async () => {
    if (collectionAddress) {
      try {
        const response = await getCollectionData(collectionAddress, page);
        if (response.error) {
          setNotFound(true);
          setShowLoadMore(false);
          return;
        }
        if (collectionData) {
          setCollectionNfts({
            ...collectionNfts,
            data: [...collectionNfts.data, ...response.nfts.data],
          });
        } else {
          setCollectionData(response);
          setCollectionNfts(response.nfts);
        }
        setPage(page + 1);
        setShowLoadMore(true);
        setIsSearching(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(async () => {
    setDarkMode(false);
  }, []);

  useEffect(async () => {
    getCollection();
  }, [collectionAddress]);

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
            <Statistics nftsCount={collectionNfts?.total} ownersCount={ownersCount} />
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
              {/* <ApiCollectionSearchFilters
                searchText={inputText}
                search={setInputText}
                resetPagination={resetPagination}
              /> */}
              {isSearching ? (
                <CollectionPageLoader />
              ) : collectionNfts?.data.filter((nft) => !nft.hidden).length ? (
                <>
                  <div className="nfts__lists" ref={nftsContainerRef}>
                    {collectionNfts?.data
                      // .slice(offset, offset + perPage)
                      .filter((nft) => !nft.hidden)
                      .map((nft) => {
                        if (nft.metadata) {
                          nft.metadata.image = nft.metadata?.image_thumbnail_url;
                        }
                        return (
                          <NFTCard
                            key={nft.id}
                            nft={{
                              ...nft,
                              collection: collectionData?.collection,
                            }}
                            collectionAddress={collectionAddress}
                          />
                        );
                      })}
                  </div>
                  {showLoadMore ? <LoadMore loadMore={getCollection} pageAndSize /> : null}
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
