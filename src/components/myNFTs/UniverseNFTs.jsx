import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import '../pagination/Pagination.scss';
import './UniverseNFTs.scss';
import uuid from 'react-uuid';
import AppContext from '../../ContextAPI';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import { LOBSTER_COLLECTION_NAME } from '../../utils/helpers/lobsters';
import { POLYMORPHS_COLLECTION_NAME } from '../../utils/helpers/polymorphs';
import SimplePagination from '../pagination/SimplePaginations';
import MyPolymorphsChart from './MyPolymorphsChart';
import MyLobstersChart from './MyLobstersChart';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { usePolymorphContext } from '../../contexts/PolymorphContext';
import { useLobsterContext } from '../../contexts/LobsterContext';

const UniverseNFTs = () => {
  const {
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
  } = useMyNftsContext();

  const { userPolymorphs } = usePolymorphContext();
  const { userLobsters } = useLobsterContext();

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

  const renderMyNFTsNew = () => {
    if (collectionFilter === polymorphsFilter) {
      return (
        <MyPolymorphsChart
          isDropdownOpened={isDropdownOpened}
          setIsDropdownOpened={setIsDropdownOpened}
        />
      );
    }
    if (collectionFilter === lobstersFilter) {
      return (
        <MyLobstersChart
          isDropdownOpened={isDropdownOpened}
          setIsDropdownOpened={setIsDropdownOpened}
        />
      );
    }

    return <div>Invalid collection</div>;
  };

  return (
    <div className="tab__saved__nfts">
      <div className="tab__wallet">{renderMyNFTsNew()}</div>
    </div>
  );
};
export default UniverseNFTs;
