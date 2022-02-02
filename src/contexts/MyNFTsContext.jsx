import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useAuthContext } from './AuthContext';
import {
  getMyMintableCollections,
  getMyMintedCollections,
  getMyMintingCollections,
  getMyMintingCollectionsCount,
  getMyMintingNfts,
  getMyMintingNftsCount,
  getMyNfts,
  getNftSummary,
  getSavedNfts,
} from '../utils/api/mintNFT';
import universeIcon from '../assets/images/universe-img.svg';

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
  const [myCollectionID, setMyCollectionID] = useState(null);
  const [universeNFTs, setUniverseNFTs] = useState([]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [activeTxHashes, setActiveTxHashes] = useState([]);
  const [myMintingCollections, setMyMintingCollections] = useState([]);
  const [mintingNftsCount, setMintingNftsCount] = useState(0);
  const [mintingCollectionsCount, setMintingCollectionsCount] = useState(0);
  const [universeCollection, setUniverseCollection] = useState(null);
  const [myNftsLoading, setMyNftsLoading] = useState(true);
  const [myMintableCollections, setMyMintableCollections] = useState([]);
  const [userPageNftsCount, setUserPageNftsCount] = useState(0);

  const [nftSummary, setNftSummary] = useState(null);

  const fetchNftSummary = async () => {
    const summary = await getNftSummary();
    setNftSummary(summary);
  };

  const fetchNfts = async () => {
    try {
      setMyNftsLoading(true);

      const mintableCollections = await getMyMintableCollections(0, 1000);

      const universeColl = mintableCollections.collections.filter(
        (coll) =>
          coll.address.toLowerCase() ===
          process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase()
      )[0];

      if (!universeColl) {
        alert('Failed to load Universe Core collection');
      } else {
        setUniverseCollection({
          ...universeColl,
          coverUrl: universeIcon,
        });
      }
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
    }
  }, [loggedInArtist, isWalletConnected, isAuthenticated]);

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
        mintingNftsCount,
        setMintingNftsCount,
        mintingCollectionsCount,
        setMintingCollectionsCount,
        universeCollection,
        myNftsLoading,
        myMintableCollections,
        setMyMintableCollections,
        fetchNftSummary,
        nftSummary,
        userPageNftsCount,
        setUserPageNftsCount,
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
