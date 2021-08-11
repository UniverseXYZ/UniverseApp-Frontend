/* eslint-disable no-debugger */
/* eslint-disable no-await-in-loop */
import { Contract } from 'ethers';
import {
  getMetaForSavedNft,
  getTokenURI,
  saveCollection,
  attachTxHashToCollection,
  getMyCollections,
} from '../../api/mintNFT';
import { chunkifyArray, formatRoyaltiesForMinting } from '../contractInteraction';

export const getCollectionsAdddresses = (obj) => {
  const { data, context } = obj;
  const dataObject = {};

  data.forEach((nft) => {
    dataObject[nft.collectionId] = context.collectionsIdAddressMapping[nft.collectionId] || 0;
  });

  return {
    ...obj,
    data: dataObject,
  };
};

export const getSingleCollectionAddress = async (data) => {
  let collection = false;
  let status = true;

  while (!collection && status) {
    console.log('attempting to get contract address...');
    const fetchedCollections = await getMyCollections();

    if (!fetchedCollections) {
      status = false;
    }

    const searchResult = fetchedCollections.find(
      (col) => col.name === data.collection.name && col.symbol === data.collection.symbol
    );
    console.log(searchResult);
    collection = searchResult;
  }

  data.collection.address = collection.address;
  data.collection.id = collection.id;

  return data;
};

export const createSingleContract = (data) => {
  console.log(data);
  const { collection, context } = data;
  const contract = {};

  contract[collection.id] = new Contract(
    collection.address,
    context.contracts.UniverseERC721Core.abi,
    context.signer
  );

  return {
    contract,
    collection: data.collection,
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

export const generateTokenURIsForSavedNfts = async (data) => {
  console.log('requesting meta data');
  for (let i = 0; i < data.length; i += 1) {
    data[i].tokenUri = await getMetaForSavedNft(data[i].id);
  }

  return data;
};

export const generateTokenURIs = async (data) => {
  console.log('requesting meta data');
  console.log(data);
  for (let i = 0; i < data.length; i += 1) {
    data[i].tokenUri = await getTokenURI({
      file: data[i].previewImage || data[i].file,
      name: data[i].name,
      description: data[i].description,
      editions: data[i].numberOfEditions,
      propertiesParsed: data[i].properties,
      royaltiesParsed: data[i].royalties,
    });
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

export const sendSaveCollectionRequest = async (data) => {
  const { file, name, symbol, description, shortUrl } = data.collection;
  const collectionCreationResult = await saveCollection({
    file,
    name,
    symbol,
    description,
    shortUrl,
  });

  data.collection.id = collectionCreationResult?.id;

  return data;
};

export const deployCollection = async (data) => {
  if (data.collection.id) {
    console.log('deploying collection...');
    const unsignedMintCollectionTx =
      await data.context.universeERC721FactoryContract.deployUniverseERC721(
        data.collection.name,
        data.collection.tokenName
      );

    const res = await unsignedMintCollectionTx.wait();

    console.log(unsignedMintCollectionTx);
    console.log(res);

    data.collection.transactionHash = res.transactionHash;
    data.collection.from = res.from;
  } else {
    console.error('There was an error');
  }

  return data;
};

export const updateCollectionTxHash = async ({ collection }) => {
  const response = await attachTxHashToCollection(collection.transactionHash, collection.id);

  if (!response.ok && response.status !== 201) {
    console.error(`Error while trying to save a new collection: ${response.statusText}`);
  }

  return collection;
};

export const attachCollectionIdToNfts = ({ collection, nfts }) => {
  nfts.map((nft) => {
    nft.collectionId = collection?.id || 0;
    return nft;
  });
  return nfts;
};
