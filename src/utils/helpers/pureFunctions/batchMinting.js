/* eslint-disable no-await-in-loop */
import { Contract } from 'ethers';
import { getMetaForSavedNft } from '../../api/mintNFT';
import { chunkifyArray, formatRoyaltiesForMinting } from '../contractInteraction';

export const getCollectionsAdddresses = (obj) => {
  const { data, context } = obj;
  const dataObject = {};

  // if collection id is not found in collectionsIdAddressMapping,
  // we shouldn't assign address, because we'll call the Universe contract
  data.forEach((nft) => {
    dataObject[nft.collectionId] = context.collectionsIdAddressMapping[nft.collectionId] || 0;
  });

  return {
    ...obj,
    data: dataObject,
  };
};

export const createContractInstancesFromAddresses = (obj) => {
  const { data, context } = obj;
  const dataObject = {};

  // if there is no address we need to use the Universe Contract
  Object.keys(data).forEach((collectionId) => {
    dataObject[data[collectionId] ? collectionId : 0] = data[collectionId]
      ? new Contract(data[collectionId], context.contracts.UniverseERC721Core.abi, context.signer)
      : context.universeERC721CoreContract;
  });

  return {
    ...obj,
    data: dataObject,
  };
};

export const extractRequiredDataForMinting = (data) => {
  const returnData = data.map((nft) => ({
    collectionId: nft.collectionId ? nft.collectionId : 0,
    royalties: nft.royalties,
    id: nft.id,
  }));

  return returnData;
};

export const generateTokenURIs = async (data) => {
  console.log('requesting meta data');
  for (let i = 0; i < data.length; i += 1) {
    data[i].tokenUri = await getMetaForSavedNft(data[i].id);
    data[i] = {
      ...data[i],
      tokenUri: data[i].tokenUri,
    };
  }

  return data;
};

export const returnTokenURIsAndRoyalties = (data) => {
  const tokenURIsAndRoyaltiesObject = {};

  data.forEach((nft) => {
    if (!tokenURIsAndRoyaltiesObject[nft.collectionId])
      tokenURIsAndRoyaltiesObject[nft.collectionId] = [];

    nft.tokenUri.forEach((token) => {
      tokenURIsAndRoyaltiesObject[nft.collectionId].push({
        token,
        royalties: nft.royalties,
      });
    });
  });

  return tokenURIsAndRoyaltiesObject;
};

export const formatTokenURIsAndRoyaltiesObject = (data) => {
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

export const formatRoyalties = (data) => {
  const returnData = data.map((nft) => ({
    ...nft,
    royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
  }));

  return returnData;
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

export const mintChunkToContract = async ({ address, tokens, royalties, contract }) => {
  const mintTransaction = await contract.batchMintWithDifferentFees(address, tokens, royalties);

  const mintReceipt = await mintTransaction.wait();

  console.log('printing receipt...', mintReceipt);
};
