import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchTokensMetadataJson } from '../utils/api/polymorphs';
import { convertPolymorphObjects } from '../utils/helpers/polymorphs';
import { queryPolymorphsGraph, transferPolymorphs } from '../utils/graphql/polymorphQueries';
import { useAuthContext } from './AuthContext';

const PolymorphContext = createContext(null);

const PolymorphContextProvider = ({ children }) => {
  const [userPolymorphs, setUserPolymorphs] = useState([]);
  const [userPolymorphWithMetadata, setUserPolymorphsWithMetadata] = useState([]);
  const [userPolymorphsLoaded, setUserPolymorphsLoaded] = useState(false);
  const { address } = useAuthContext();

  const fetchUserPolymorphsTheGraph = async (newAddress) => {
    setUserPolymorphsLoaded(false);

    const polymorphs = await queryPolymorphsGraph(transferPolymorphs(newAddress));
    const userNftIds = polymorphs?.transferEntities.map((nft) => ({
      tokenId: nft.tokenId,
      id: parseInt(nft.id, 16),
    }));

    setUserPolymorphs(userNftIds || []);
    setUserPolymorphsLoaded(true);
  };

  // This is a new function for loading the metadata of the polymorphs
  // This previously was inside fetchUserPolymorphsTheGraph
  // but polymorph metadata isn't used anywhere currently so I'm splitting
  // the function into two pieces so we don't make unnecessary calls to the cloud function
  // and we can load the metadata on demand when needed
  const loadMetadata = async () => {
    const userNftIds = userPolymorphs.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_POLYMORPHS_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const polymorphNFTs = convertPolymorphObjects(nftMetadataObjects);
    if (polymorphNFTs) {
      setUserPolymorphsWithMetadata(polymorphNFTs);
    }
  };

  useEffect(() => {
    if (address) {
      setUserPolymorphs([]);
      fetchUserPolymorphsTheGraph(address);
    }
  }, [address]);

  return (
    <PolymorphContext.Provider
      value={{
        userPolymorphs,
        setUserPolymorphs,
        userPolymorphsLoaded,
        setUserPolymorphsLoaded,
        userPolymorphWithMetadata,
      }}
    >
      {children}
    </PolymorphContext.Provider>
  );
};

PolymorphContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const usePolymorphContext = () => {
  const context = useContext(PolymorphContext);

  if (!context) {
    throw new Error('usePolymorphContext was used outside of its Provider');
  }

  return context;
};

export { PolymorphContext, PolymorphContextProvider, usePolymorphContext };
