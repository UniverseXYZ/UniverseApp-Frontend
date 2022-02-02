import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';
import { queryLobstersGraph, transferLobsters } from '../utils/graphql/lobsterQueries';
import { fetchTokensMetadataJson } from '../utils/api/lobsters';
import { convertLobsterObjects } from '../utils/helpers/lobsters';

const LobsterContext = createContext(null);

const LobsterContextProvider = ({ children }) => {
  const [userLobsters, setUserLobsters] = useState([]);
  const [userLobstersWithMetadata, setUserLobstersWithMetadata] = useState([]);
  const [userLobstersLoaded, setUserLobstersLoaded] = useState(false);
  const { address } = useAuthContext();

  const fetchUserLobstersTheGraph = async (newAddress) => {
    setUserLobstersLoaded(false);

    const lobsters = await queryLobstersGraph(transferLobsters(newAddress));
    const userNftIds = lobsters?.transferEntities.map((nft) => ({
      tokenId: nft.tokenId,
      id: parseInt(nft.id, 16),
    }));

    setUserLobsters(userNftIds || []);
    setUserLobstersLoaded(true);
  };

  // This is a new function for loading the metadata of the lobsters
  // This previously was inside fetchUserLobstersTheGraph
  // but polymorph metadata isn't used anywhere currently so I'm splitting
  // the function into two pieces so we don't make unnecessary calls to the cloud function
  // and we can load the metadata on demand when needed
  const loadLobsterMetadata = async () => {
    const userNftIds = userLobsters.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_LOBSTER_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const lobsterNFTs = convertLobsterObjects(nftMetadataObjects);
    if (lobsterNFTs) {
      setUserLobstersWithMetadata(lobsterNFTs);
    }
  };

  useEffect(() => {
    setUserLobsters([]);
    fetchUserLobstersTheGraph(address);
  }, [address]);

  return (
    <LobsterContext.Provider
      value={{
        userLobsters,
        setUserLobsters,
        userLobstersLoaded,
        setUserLobstersLoaded,
        userLobstersWithMetadata,
        loadLobsterMetadata,
      }}
    >
      {children}
    </LobsterContext.Provider>
  );
};

LobsterContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useLobsterContext = () => {
  const context = useContext(LobsterContext);

  if (!context) {
    throw new Error('useLobsterContext was used outside of its Provider');
  }

  return context;
};

export { LobsterContextProvider, useLobsterContext };
