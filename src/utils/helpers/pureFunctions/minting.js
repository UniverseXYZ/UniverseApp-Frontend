/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-await-in-loop */
import { Contract } from 'ethers';
import { chunkifyArray, formatRoyaltiesForMinting } from '../contractInteraction';

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.collectionsIdAddressMapping
 * @param {Object[]} data.nfts
 * @param data.nfts[].collectionId
 */
export const getCollectionsAdddresses = ({ nfts, helpers }) => {
  const nftsAttachedAddress = nfts.map((nft) => ({
    ...nft,
    contractAddress: helpers.collectionsIdAddressMapping[nft.collectionId] || 0,
  }));

  return {
    nfts: nftsAttachedAddress,
    helpers,
  };
};

export const createSingleContract = ({ collection, helpers }) => {
  const contract = {};

  contract[collection.id] = new Contract(
    collection.address,
    helpers.contracts.UniverseERC721Core.abi,
    helpers.signer
  );

  return {
    contract,
    collection,
  };
};

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.universeERC721CoreContract
 * @param data.helpers.contracts
 * @param data.helpers.signer
 * @param {Object[]} data.nfts
 * @param data.nfts[].collectionId
 * @param data.nfts[].contractAddress
 * @return {Object} requiredContracts {[collectionId]: Contract}
 */
export const createContractInstancesFromAddresses = ({ nfts, helpers }) => {
  const dataObject = {};

  // if there is no address we need to use the Universe Contract
  nfts.forEach((nft) => {
    dataObject[nft.collectionId || 0] = nft.contractAddress
      ? new Contract(nft.contractAddress, helpers.contracts.UniverseERC721Core.abi, helpers.signer)
      : helpers.universeERC721CoreContract;
  });

  return dataObject;
};

export const extractRequiredDataForMinting = ({ nfts }) => {
  const nftsStripped = nfts.map((nft) => ({
    collectionId: nft.collectionId ? nft.collectionId : 0,
    royalties: nft.royalties,
    id: nft.id,
  }));

  return { nfts: nftsStripped };
};

export const returnTokenURIsAndRoyalties = ({ nfts }) => {
  if (!nfts) return {};
  const tokenURIsAndRoyaltiesObject = {};

  nfts.forEach((nft) => {
    if (!tokenURIsAndRoyaltiesObject[nft.collectionId])
      tokenURIsAndRoyaltiesObject[nft.collectionId] = [];

    nft.tokenUri.forEach((token) => {
      tokenURIsAndRoyaltiesObject[nft.collectionId].push({
        token,
        royalties: nft.royalties,
      });
    });
  });

  return {
    tokenURIsAndRoyaltiesObject,
    isSingle: nfts.length === 1 && nfts[0].tokenUri.length === 1,
  };
};

const formatTokenURIsAndRoyaltiesObject = (data) => {
  const royaltiesArray = [];
  const tokensArray = [];

  data.forEach((entry) => {
    royaltiesArray.push(entry.royalties);
    tokensArray.push(entry.token);
  });

  return {
    royaltiesArray,
    tokensArray,
  };
};

export const formatRoyalties = ({ nfts }) => {
  if (!nfts) return { nfts: false };
  const formattedNfts = nfts.map((nft) => ({
    ...nft,
    royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
  }));

  return { nfts: formattedNfts };
};

export const getBatchMintingData = (tokenURIsAndRoyaltiesEntry) => {
  const CHUNK_SIZE = process.env.REACT_APP_BATCH_MINTING_CHUNK_SIZE;

  const { royaltiesArray, tokensArray } = formatTokenURIsAndRoyaltiesObject(
    tokenURIsAndRoyaltiesEntry
  );

  const tokensChunks = chunkifyArray(tokensArray, CHUNK_SIZE);
  const royaltiesChunks = chunkifyArray(royaltiesArray, CHUNK_SIZE);

  return {
    tokensChunks,
    royaltiesChunks,
    chunksCount: royaltiesChunks.length,
  };
};

export const attachCollectionIdToNfts = ({ collection, nfts }) => {
  nfts.map((nft) => {
    nft.collectionId = collection?.id || 0;
    return nft;
  });
  return { nfts };
};

export const resolveAllPromises = async (promises) => {
  let res;
  try {
    res = await Promise.all(promises);
  } catch (e) {
    res = [];
    console.error('error');
  }
  return res;
};
