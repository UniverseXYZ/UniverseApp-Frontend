import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useAuthContext } from './AuthContext';
import {
  getMyMintedCollections,
  getMyMintingCollections,
  getMyMintingNfts,
  getMyNfts,
  getSavedNfts,
} from '../utils/api/mintNFT';

const MyNFTsContext = createContext(null);

const MyNFTsContextProvider = ({ children }) => {
  const {
    loggedInArtist,
    isWalletConnected,
    deployedCollections,
    setDeployedCollections,
    isAuthenticated,
  } = useAuthContext();
  const history = useHistory();

  const allCharactersFilter = 'All Characters';
  const polymorphsFilter = 'Polymorphs';
  const lobstersFilter = 'Lobby Lobsters';
  const [collectionsIdAddressMapping, setCollectionsIdAddressMapping] = useState({});
  const [savedNfts, setSavedNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myMintingNFTs, setMyMintingNFTs] = useState([]);
  const [myUniversNFTsSearchPhrase, setMyUniversNFTsSearchPhrase] = useState('');
  const [myUniverseNFTsperPage, setMyUniverseNFTsPerPage] = useState(12);
  const [myUniverseNFTsActiverPage, setMyUniverseNFTsActiverPage] = useState(0);
  const [myUniverseNFTsOffset, setMyUniverseNFTsOffset] = useState(0);
  const [collectionFilter, setCollectionFilter] = useState(polymorphsFilter);
  const [myNFTsSelectedTabIndex, setMyNFTsSelectedTabIndex] = useState(0);
  const [activeView, setActiveView] = useState(null);
  const [savedNFTsID, setSavedNFTsID] = useState(null);
  const [savedCollectionID, setSavedCollectionID] = useState(null);
  const [myCollectionID, setMyCollectionID] = useState(null);
  const [universeNFTs, setUniverseNFTs] = useState([]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [activeTxHashes, setActiveTxHashes] = useState([]);
  const [myMintingCollections, setMyMintingCollections] = useState([]);

  const fetchNfts = async () => {
    try {
      const [savedNFTS, myNfts, mintingNfts, mintedCollectionsRequest, mintingcollectionsRequest] =
        await Promise.all([
          getSavedNfts(),
          getMyNfts(),
          getMyMintingNfts(),
          getMyMintedCollections(),
          getMyMintingCollections(),
        ]);

      setSavedNfts(savedNFTS || []);
      setMyNFTs(myNfts || []);
      setMyMintingNFTs(mintingNfts || []);
      setDeployedCollections(mintedCollectionsRequest.collections || []);
      setMyMintingCollections(mintingcollectionsRequest.collections || []);
    } catch (err) {
      alert(
        'Failed to fetch nfts. Most likely due to failed notifcation. Please sign out and sign in again.'
      );
    }
  };

  useEffect(() => {
    const mapping = {};
    deployedCollections.forEach((collection) => {
      mapping[collection.id] = collection.address;
    });
    setCollectionsIdAddressMapping(mapping);
  }, [deployedCollections]);

  useEffect(() => {
    const canRequestData = loggedInArtist && isWalletConnected && isAuthenticated;
    if (canRequestData) {
      fetchNfts();
    } else {
      setSavedNfts([]);
      setMyNFTs([]);
      setDeployedCollections([]);
    }
  }, [loggedInArtist, isWalletConnected]);

  const navigateToMyUniverseNFTsTab = (characterFilter) => {
    setCollectionFilter(characterFilter);
    setMyNFTsSelectedTabIndex(3);
    setMyUniverseNFTsActiverPage(0);
    setMyUniverseNFTsOffset(0);

    history.push('/my-nfts');
  };

  return (
    <MyNFTsContext.Provider
      value={{
        allCharactersFilter,
        polymorphsFilter,
        lobstersFilter,
        navigateToMyUniverseNFTsTab,
        collectionsIdAddressMapping,
        setCollectionsIdAddressMapping,
        savedNfts,
        setSavedNfts,
        myNFTs,
        setMyNFTs,
        myUniversNFTsSearchPhrase,
        setMyUniversNFTsSearchPhrase,
        myUniverseNFTsperPage,
        setMyUniverseNFTsPerPage,
        myUniverseNFTsActiverPage,
        setMyUniverseNFTsActiverPage,
        myUniverseNFTsOffset,
        setMyUniverseNFTsOffset,
        collectionFilter,
        setCollectionFilter,
        myNFTsSelectedTabIndex,
        setMyNFTsSelectedTabIndex,
        activeView,
        setActiveView,
        savedNFTsID,
        setSavedNFTsID,
        savedCollectionID,
        setSavedCollectionID,
        myCollectionID,
        setMyCollectionID,
        universeNFTs,
        setUniverseNFTs,
        savedCollections,
        setSavedCollections,
        activeTxHashes,
        setActiveTxHashes,
        myMintingNFTs,
        setMyMintingNFTs,
        myMintingCollections,
        setMyMintingCollections,
      }}
    >
      {children}
    </MyNFTsContext.Provider>
  );
};

MyNFTsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useMyNftsContext = () => {
  const context = useContext(MyNFTsContext);

  if (!context) {
    throw new Error('useMyNftsContext was used outside of its Provider');
  }

  return context;
};

export { MyNFTsContextProvider, useMyNftsContext };
