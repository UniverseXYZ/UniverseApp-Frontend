import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';
import { queryLobstersGraph, transferLobsters } from '../utils/graphql/lobsterQueries';
import { fetchTokensMetadataJson } from '../utils/api/lobsters';
import { convertLobsterObjects } from '../utils/helpers/lobsters';

const LobsterContext = createContext(null);

const LobsterContextProvider = ({ children }) => {
  const [userLobsters, setUserLobsters] = useState([]);
  const [userLobstersLoaded, setUserLobstersLoaded] = useState(false);
  const { address } = useAuthContext();

  const fetchUserLobstersTheGraph = async (newAddress) => {
    setUserLobstersLoaded(false);

    const lobsters = await queryLobstersGraph(transferLobsters(newAddress));
    const userNftIds = lobsters?.transferEntities?.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_LOBSTER_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const lobsterNFTs = convertLobsterObjects(nftMetadataObjects);
    if (lobsterNFTs) {
      setUserLobsters(lobsterNFTs);
    }
    setUserLobstersLoaded(true);
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
        fetchUserLobstersTheGraph,
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
