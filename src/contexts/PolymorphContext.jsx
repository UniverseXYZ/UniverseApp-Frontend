import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchTokensMetadataJson } from '../utils/api/polymorphs';
import { convertPolymorphObjects } from '../utils/helpers/polymorphs';
import { queryPolymorphsGraph, transferPolymorphs } from '../utils/graphql/polymorphQueries';
import { useAuthContext } from './AuthContext';

const PolymorphContext = createContext(null);

const PolymorphContextProvider = ({ children }) => {
  const [userPolymorphs, setUserPolymorphs] = useState([]);
  const [userPolymorphsLoaded, setUserPolymorphsLoaded] = useState(false);
  const { address } = useAuthContext();

  const fetchUserPolymorphsTheGraph = async (newAddress) => {
    setUserPolymorphsLoaded(false);

    const polymorphs = await queryPolymorphsGraph(transferPolymorphs(newAddress));

    const userNftIds = polymorphs?.transferEntities?.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_POLYMORPHS_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const polymorphNFTs = convertPolymorphObjects(nftMetadataObjects);
    if (polymorphNFTs) {
      setUserPolymorphs(polymorphNFTs);
    }
    setUserPolymorphsLoaded(true);
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
        fetchUserPolymorphsTheGraph,
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
