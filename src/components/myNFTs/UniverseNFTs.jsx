import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import '../pagination/Pagination.scss';
import './UniverseNFTs.scss';
import uuid from 'react-uuid';
import { useQuery } from '@apollo/client';
import AppContext from '../../ContextAPI';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import LobsterCard from './LobsterCard';
import PolymorphCard from './PolymorphCard';
import { LOBSTER_COLLECTION_NAME } from '../../utils/helpers/lobsters';
import { POLYMORPHS_COLLECTION_NAME } from '../../utils/helpers/polymorphs';
import SimplePagination from '../pagination/SimplePaginations';
import CollectionDropdown from './CollectionDropdown';

const UniverseNFTs = () => {
  const {
    userPolymorphs,
    userLobsters,
    myUniversNFTsSearchPhrase,
    setMyUniversNFTsSearchPhrase,
    myUniverseNFTsperPage,
    setMyUniverseNFTsPerPage,
    setMyUniverseNFTsActiverPage,
    myUniverseNFTsOffset,
    setMyUniverseNFTsOffset,
    userLobstersLoaded,
    userPolymorphsLoaded,
    collectionFilter,
    setCollectionFilter,
    allCharactersFilter,
    polymorphsFilter,
    lobstersFilter,
  } = useContext(AppContext);

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);

  const filterByCollection = (collectionName) => {
    let collection = [];
    switch (collectionName) {
      case allCharactersFilter:
        collection = [...userPolymorphs, ...userLobsters];
        break;
      case polymorphsFilter:
        collection = userPolymorphs;
        break;
      case lobstersFilter:
        collection = userLobsters;
        break;

      default:
        break;
    }
    return collection.sort((a, b) => {
      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    let itemsTodisplay = [];
    itemsTodisplay = filterByCollection(collectionFilter);
    if (myUniversNFTsSearchPhrase) {
      itemsTodisplay = itemsTodisplay.filter(
        (item) => item.name.toLowerCase().indexOf(myUniversNFTsSearchPhrase.toLowerCase()) > -1
      );
    }
    setDisplayItems(itemsTodisplay);
  }, [userPolymorphs, userLobsters]);

  useEffect(() => {
    setCollectionFilter(collectionFilter);
  }, [collectionFilter]);

  const handleSearchByName = (value) => {
    setMyUniverseNFTsActiverPage(0);
    setMyUniverseNFTsOffset(0);

    setMyUniversNFTsSearchPhrase(value);

    const itemsTodisplay = [...userLobsters, ...userPolymorphs].filter(
      (item) => item.name.toLowerCase().indexOf(value.trim().toLowerCase()) > -1
    );
    setDisplayItems(itemsTodisplay);
  };

  const setFilter = (filter) => {
    console.log(filter.target.innerText);
    setCollectionFilter(filter.target.innerText);
    setIsDropdownOpened(false);
    setMyUniverseNFTsActiverPage(0);
    setMyUniverseNFTsOffset(0);
    setDisplayItems(filterByCollection(filter.target.innerText));
  };

  const renderMyNFTs = useMemo(
    () =>
      displayItems
        .slice(myUniverseNFTsOffset, myUniverseNFTsOffset + myUniverseNFTsperPage)
        .map((elm) =>
          elm.collectionName === LOBSTER_COLLECTION_NAME ? (
            <LobsterCard lobster={elm} />
          ) : elm.collectionName === POLYMORPHS_COLLECTION_NAME ? (
            <PolymorphCard polymorph={elm} />
          ) : elm.previewImage.type === 'image/jpg' ? (
            <PolymorphCard polymorph={elm} />
          ) : (
            <div key={uuid()} className="nft__box">
              <div className="videoicon">
                <img alt="videocover" src={elm.videoavatar} />
              </div>
              <div className="nft__box__image">
                <video
                  onMouseOver={(event) => event.target.play()}
                  onFocus={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  onBlur={(event) => event.target.pause()}
                >
                  <source src={elm.previewImage.url} type="video/mp4" />
                  <track kind="captions" />
                </video>
              </div>
              <div className="polymorph">
                <p>{elm.name}</p>
              </div>
              <div className="nft_box_footer">
                <img alt="fjffd" src={elm.collectionAvatar} />
                <p>{elm.collectionName}</p>
              </div>
            </div>
          )
        ),
    [displayItems, myUniverseNFTsOffset, myUniverseNFTsperPage]
  );

  return (
    <div className="tab__saved__nfts">
      <div className="tab__wallet">
        <div className="universe_NFTs">
          <CollectionDropdown
            isDropdownOpened={isDropdownOpened}
            setIsDropdownOpened={setIsDropdownOpened}
            setFilter={setFilter}
            allCharactersFilter={allCharactersFilter}
            polymorphsFilter={polymorphsFilter}
            lobstersFilter={lobstersFilter}
            collectionFilter={collectionFilter}
          />
          <div className="universe_search_by_name">
            <div className="universe_search_by_name_label">
              <span>Search by name</span>
            </div>
            <div className="search_by_name_input">
              <input
                type="text"
                placeholder="Start typing"
                value={myUniversNFTsSearchPhrase}
                onChange={(e) => handleSearchByName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="nfts__lists">{renderMyNFTs}</div>
        {displayItems.length ? (
          <div>
            <div className="pagination__container">
              <SimplePagination
                data={displayItems}
                perPage={myUniverseNFTsperPage}
                setOffset={setMyUniverseNFTsOffset}
              />
              <ItemsPerPageDropdown
                perPage={myUniverseNFTsperPage}
                setPerPage={setMyUniverseNFTsPerPage}
              />
            </div>
          </div>
        ) : (
          <div className="empty__filter__nfts">
            <h3>
              {userLobstersLoaded && userPolymorphsLoaded ? 'No NFTs found' : 'Loading your NFTs'}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default UniverseNFTs;
