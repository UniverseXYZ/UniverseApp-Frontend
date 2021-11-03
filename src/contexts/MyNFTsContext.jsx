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
  const [activeView, setActiveView] = useState(null);
  const [savedNFTsID, setSavedNFTsID] = useState(null);
  const [savedCollectionID, setSavedCollectionID] = useState(null);
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

  let nftPollInterval = null;
  let collPollInterval = null;
  const pollingInterval = 10000;

  const fetchNfts = async () => {
    try {
      setMyNftsLoading(true);
      const [
        savedNFTS,
        myNfts,
        mintingNfts,
        mintedCollectionsRequest,
        mintingcollectionsRequest,
        mintableCollections,
      ] = await Promise.all([
        getSavedNfts(),
        getMyNfts(),
        getMyMintingNfts(),
        getMyMintedCollections(),
        getMyMintingCollections(),
        getMyMintableCollections(),
      ]);

      setSavedNfts(savedNFTS || []);

      setMyNFTs(myNfts || []);
      setMyNftsLoading(false);
      setMyMintingNFTs(mintingNfts || []);

      setDeployedCollections(mintedCollectionsRequest.collections || []);
      setMyMintableCollections(mintableCollections.collections || []);
      setMyMintingCollections(mintingcollectionsRequest.collections || []);
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

      if (mintingNfts.length) {
        setMintingNftsCount(mintingNfts.length);
      }

      if (mintingcollectionsRequest.collections.length) {
        mintingCollectionsCount(mintingcollectionsRequest.collections.length);
      }
    } catch (err) {
      alert(
        'Failed to fetch nfts. Most likely due to failed notifcation. Please sign out and sign in again.'
      );
      setMyNftsLoading(false);
    }
    setMyNftsLoading(false);
  };

  useEffect(() => {
    const mapping = {};
    deployedCollections.forEach((collection) => {
      mapping[collection.id] = collection.address;
    });
    setCollectionsIdAddressMapping(mapping);
  }, [deployedCollections]);

  useEffect(() => {
    if (mintingNftsCount && !nftPollInterval) {
      setTimeout(async () => {
        // We need to wait a bit as the API isn't fast enough
        let [myNfts, mintingNfts] = await Promise.all([getMyNfts(), getMyMintingNfts()]);
        setMyNFTs(myNfts);
        setMyMintingNFTs(mintingNfts);
        nftPollInterval = setInterval(async () => {
          mintingNfts = await getMyMintingNfts();
          setMyMintingNFTs(mintingNfts);
          if (mintingNfts.length !== mintingNftsCount) {
            myNfts = await getMyNfts();
            setMyNFTs(myNfts);
            setMintingNftsCount(mintingNfts?.length || 0);
            if (!mintingNfts?.length || mintingNfts.length === 0) {
              clearInterval(nftPollInterval);
            }
          }
        }, pollingInterval);
      }, 1000);
    } else if (!mintingNftsCount && nftPollInterval) {
      clearInterval(nftPollInterval);
    }
  }, [mintingNftsCount]);

  useEffect(() => {
    if (mintingCollectionsCount && !collPollInterval) {
      collPollInterval = setInterval(async () => {
        const apiMintingCount = await getMyMintingCollectionsCount();
        if (apiMintingCount !== mintingCollectionsCount) {
          const [mintedCollections, mintableCollections, mintingCollections] = await Promise.all([
            getMyMintedCollections(),
            getMyMintableCollections(),
            getMyMintingCollections(),
          ]);
          setDeployedCollections(mintedCollections.collections);
          setMyMintableCollections(mintableCollections.collections);
          setMyMintingCollections(mintingCollections.collections);
          setMintingCollectionsCount(mintingCollections?.collections?.length || 0);

          if (
            !mintingCollections?.collections?.length ||
            mintingCollections?.collections?.length === 0
          ) {
            clearInterval(collPollInterval);
          }
        }
      }, pollingInterval);
    } else if (!mintingCollectionsCount && nftPollInterval) {
      clearInterval(collPollInterval);
    }
  }, [mintingCollectionsCount]);

  useEffect(() => {
    const canRequestData = loggedInArtist && isWalletConnected && isAuthenticated;
    if (canRequestData) {
      fetchNfts();
    } else {
      setSavedNfts([]);
      setMyNFTs([]);
      setDeployedCollections([]);
    }
  }, [loggedInArtist && isWalletConnected]);

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
        mintingNftsCount,
        setMintingNftsCount,
        mintingCollectionsCount,
        setMintingCollectionsCount,
        universeCollection,
        myNftsLoading,
        myMintableCollections,
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
