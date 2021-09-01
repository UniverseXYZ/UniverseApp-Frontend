/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-await-in-loop */
import { Contract } from 'ethers';
import { chunkifyArray, formatRoyaltiesForMinting } from '../contractInteraction';

const getCurrentDay = () => parseInt(new Date().getTime() / (10000 * 60 * 60 * 24), 10);

export const placeholderBuster = () => {
  const bustStorage = () => localStorage.setItem('nftsPlaceholders', JSON.stringify([]));

  const lastUpdateDay = localStorage.getItem('nftsPlaceholdersBuster');
  const timeExceeded = getCurrentDay() - lastUpdateDay;

  if (timeExceeded) bustStorage();
};

export const getPlaceholdersLocalStorage = () =>
  JSON.parse(localStorage.getItem('nftsPlaceholders')) || [];

export const setPlaceholdersLocalStorage = (data) => {
  console.log('yes');
  localStorage.setItem('nftsPlaceholders', JSON.stringify(data));
  localStorage.setItem('nftsPlaceholdersBuster', JSON.stringify(getCurrentDay()));
};

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.collectionsIdAddressMapping
 * @param {Object[]} data.nfts
 * @param data.nfts[].collectionId
 * @returns {Object} { contract: { nfts: [] }, helpers }
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

/**
 * @param {Object} data
 * @param {Object} data.helpers
 * @param data.helpers.universeERC721CoreContract
 * @param data.helpers.contracts
 * @param data.helpers.signer
 * @param {Object[]} data.nfts
 * @param data.nfts[].collectionId
 * @param data.nfts[].contractAddress
 * @return {Object} requiredContracts { collectionId: ContractInstance }
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

/**
 * @param {Object} data
 * @param {Object} data.nfts
 * @param data.nfts.collectionId
 * @param data.nfts.royalties
 * @param data.nfts.id
 * @returns {Object} { nfts: [] }
 */
export const extractRequiredDataForMinting = ({ nfts }) => {
  const nftsStripped = nfts.map((nft) => ({
    collectionId: nft.collectionId ? nft.collectionId : 0,
    royalties: nft.royalties,
    id: nft.id,
  }));

  return { nfts: nftsStripped };
};

/**
 * @param {Object} data
 * @param {Object} data.nfts
 * @param data.nfts.collectionId
 * @param data.nfts.royalties
 * @param data.nfts.tokenUri
 * @returns {Object} { tokenURIsAndRoyaltiesObject: { collectionId: { token: [], royalties: [] } }, isSingle (bool) }
 */
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

/**
 * @param {Object[]} nfts
 * @param nfts.royalties
 * @param nfts.token
 * @returns {Object} { royaltiesArray: [], tokensArray: [] }
 */
const formatTokenURIsAndRoyaltiesObject = (nfts) => {
  const royaltiesArray = [];
  const tokensArray = [];

  nfts.forEach((entry) => {
    royaltiesArray.push(entry.royalties);
    tokensArray.push(entry.token);
  });

  return {
    royaltiesArray,
    tokensArray,
  };
};

/**
 * @param {Object} data
 * @param {Object[]} data.nfts
 * @param data.nfts.royalties
 * @returns {Object[]} { royalties }
 */
export const formatRoyalties = ({ nfts }) => {
  if (!nfts) return { nfts: false };
  const formattedNfts = nfts.map((nft) => ({
    ...nft,
    royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
  }));

  return { nfts: formattedNfts };
};

/**
 * @param {Object} tokenURIsAndRoyaltiesEntry
 * @returns {Object} { tokensChunks[], royaltiesChunks[], chunksCount (int) }
 */
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

/**
 * @param {Promise[]} promises
 * @returns {Array} result
 */
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

const FACTTORY_CONTRACT_ID = 2;

/**
 * @param {Object} data
 * @param {Object[]} data.nfts
 * @param data.nfts.collectionId
 * @param data.nfts.name
 * @param data.nfts.description
 * @returns {Object[]} { nfts }
 */
export const createPlaceholders = ({ nfts }) => {
  const currentList = getPlaceholdersLocalStorage();
  nfts?.forEach((nft) => {
    for (let i = 0; i < nft.numberOfEditions; i += 1) {
      currentList.push(`${nft.collectionId || FACTTORY_CONTRACT_ID}${nft.name}${nft.description}`);
    }
  });

  setPlaceholdersLocalStorage(currentList);

  return { nfts };
};
