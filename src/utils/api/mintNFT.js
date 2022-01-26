/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
/* eslint-disable no-useless-return */
const SAVE_FOR_LATER_MINT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_SAVED_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_MY_MINTED_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-nfts`;
const GET_MY_MINTING_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-nfts/pending`;
const GET_MY_MINTING_NFTS_COUNT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-nfts/pending/count`;
const GENERATE_TOKEN_URI_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/token-uri`;
const CREATE_COLLECTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/minting-collections`;
const GET_MY_MINTED_COLLECTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/collections/my-collections`;
const GET_MY_MINTING_COLLECTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-collections/pending`;
const GET_MY_MINTING_COLLECTIONS_COUNT = `${process.env.REACT_APP_API_BASE_URL}/api/pages/my-collections/pending/count`;
const GET_SPECIFIC_COLLECTION = `${process.env.REACT_APP_API_BASE_URL}/api/pages/collection`;
const EDIT_COLLECTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/collections`;
const GET_NFT_INFO = `${process.env.REACT_APP_API_BASE_URL}/api/pages/nft`;
const CREATE_MINTING_NFT = `${process.env.REACT_APP_API_BASE_URL}/api/minting-nfts`;

const EDIT_COLLECTION_COVER_URL = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/collections/${id}/cover-image`;
const EDIT_COLLECTION_BANNER_URL = (id) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/collections/${id}/banner-image`;
const GET_USER_NFTS_URL = (username) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/pages/user-profile/${username}/nfts`;

/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 * @param {string} data.editions
 * @param {array} data.properties
 * @param {string} data.percentAmount
 * @returns
 */
export const saveNftForLater = async (data) => {
  // Construct it in order to match the expected object keys at the BE
  const requestData = {
    name: data.name,
    numberOfEditions: parseInt(data.editions, 10),
  };

  if (data.description) {
    requestData.description = data.description;
  }
  if (data.propertiesParsed.length) {
    requestData.properties = data.propertiesParsed;
  }
  if (data.royaltiesParsed.length) {
    requestData.royalties = data.royaltiesParsed;
  }

  if (data.collectionId) requestData.collectionId = data.collectionId;

  const request = await fetch(SAVE_FOR_LATER_MINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to save NFT data: ${request.statusText}`);
  }

  const result = await request.text().then((res) => JSON.parse(res));
  return result;
};

/**
 * @param {Object} file image
 * @param {string} id id of the NFT
 */
export const saveNftImage = async (file, id) => {
  const UPLOAG_NFT_IMAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}/file`;

  const formData = new FormData();
  formData.append('file', file, file.name);

  const request = await fetch(UPLOAG_NFT_IMAGE_URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  });

  if (!request.ok) return false;

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @returns {array} with saved NFTs
 */
export const getSavedNfts = async () => {
  const request = await fetch(GET_SAVED_NFTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET saved NFTS info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @returns {array} with my NFTs
 */
export const getMyNfts = async () => {
  const request = await fetch(GET_MY_MINTED_NFTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET saved NFTS info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));

  return result.nfts;
};

export const getMyMintingNfts = async () => {
  const request = await fetch(GET_MY_MINTING_NFTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET saved NFTS info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));

  return result.mintingNfts;
};

export const getMyMintingNftsCount = async () => {
  const request = await fetch(GET_MY_MINTING_NFTS_COUNT_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET saved NFTS info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));

  return result.count;
};

/**
 * @param {string} id NFT id
 * @returns
 */
export const getMetaForSavedNft = async (id) => {
  const GET_SAVED_NFTS_TOKEN_URI_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}/token-uri`;

  const request = await fetch(GET_SAVED_NFTS_TOKEN_URI_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET meta for saved NFT: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

/**
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.description
 * @param {string} data.editions
 * @param {array} data.propertiesParsed
 * @param {string} data.percentAmount
 * @param {string} data.id
 * @returns
 */
export const updateSavedForLaterNft = async (data) => {
  const UPDATE_SAVED_FOR_LATER_NFT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${data.id}`;

  // Construct it in order to match the expected object keys at the BE
  const requestData = {
    name: data.name,
    numberOfEditions: parseInt(data.editions, 10),
  };

  if (data.description) {
    requestData.description = data.description;
  }
  if (data.propertiesParsed.length) {
    requestData.properties = data.propertiesParsed;
  }
  if (data.royaltiesParsed.length) {
    requestData.royalties = data.royaltiesParsed;
  }
  if (data.collectionId) {
    requestData.collectionId = data.collectionId;
  }

  const request = await fetch(UPDATE_SAVED_FOR_LATER_NFT_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to save NFT data: ${request.statusText}`);
  }

  const result = await request.text().then((res) => JSON.parse(res));
  return result;
};

/**
 * @param {Object} data
 * @param {file} data.file
 * @param {string} data.name
 * @param {string} data.description
 * @param {string} data.editions
 * @param {array} data.propertiesParsed
 * @param {array} data.royaltiesParsed
 * @param {number} collectionId
 * @returns
 */
export const getTokenURI = async ({
  file,
  name,
  description,
  editions,
  propertiesParsed,
  royaltiesParsed,
  collectionId,
}) => {
  const formData = new FormData();
  const noProperties = propertiesParsed?.length;
  const noRoyalties = royaltiesParsed?.length;

  formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('numberOfEditions', parseInt(editions, 10));
  formData.append('collectionId', collectionId);
  if (description) formData.append('description', description);
  if (noProperties) formData.append('properties', JSON.stringify(propertiesParsed));
  if (noRoyalties) formData.append('royalties', JSON.stringify(royaltiesParsed));

  const request = await fetch(GENERATE_TOKEN_URI_URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  });

  const result = await request.text().then((res) => JSON.parse(res));

  return result;
};

export const saveCollection = async (data) => {
  const { file, name, symbol, description } = data;

  const formData = new FormData();
  if (file) formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('symbol', symbol);
  if (description) {
    formData.append('description', description);
  }

  const requestUrl = CREATE_COLLECTION_URL;
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  };

  const request = await fetch(requestUrl, requestOptions);
  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to save a new collection: ${request.statusText}`);
  }

  const result = await request.text().then((res) => JSON.parse(res));
  return result;
};

export const attachTxHashToCollection = (txHash, collectionId) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      txHash,
    }),
  };

  return fetch(`${CREATE_COLLECTION_URL}/${collectionId}`, requestOptions);
};

export const removeSavedNft = (id) =>
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

export const updateSavedNft = async ({
  name,
  description,
  editions,
  properties,
  royaltiesParsed,
  txHash,
  collectionId,
  id,
}) => {
  const requestData = {
    name,
    description,
    numberOfEditions: editions,
    properties,
    royalties: royaltiesParsed,
    txHash,
    collectionId: collectionId || null,
  };

  const request = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to save NFT data: ${request.statusText}`);
  }
};

export const getMyMintableCollections = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };
  const url = `${GET_MY_MINTED_COLLECTIONS}?mintable=true`;
  const request = await fetch(url, requestOptions);
  const result = await request.text().then((res) => JSON.parse(res));

  return result;
};

export const getMyMintedCollections = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };
  const url = `${GET_MY_MINTED_COLLECTIONS}?mintable=false`;
  const request = await fetch(url, requestOptions);
  const result = await request.text().then((res) => JSON.parse(res));

  return result;
};

export const getMyMintingCollections = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_MY_MINTING_COLLECTIONS, requestOptions);
  const result = await request.text().then((res) => JSON.parse(res));

  return result;
};

export const getMyMintingCollectionsCount = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  };

  const request = await fetch(GET_MY_MINTING_COLLECTIONS_COUNT, requestOptions);
  const result = await request.text().then((res) => JSON.parse(res));

  return result.count;
};

export const getCollectionData = async (address, offset, perPage) => {
  const URL = `${GET_SPECIFIC_COLLECTION}/${address}?start=${offset}&limit=${perPage}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  const request = await fetch(URL, requestOptions);

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to get collection data: ${request.statusText}`);
  }

  const result = await request.text().then((res) => JSON.parse(res));
  return result;
};

export const editCollection = async (data) => {
  const URL = `${EDIT_COLLECTION_URL}/${data.id}`;

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      description: data.description || '',
    }),
  };

  const request = await fetch(URL, requestOptions);

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to get collection data: ${request.statusText}`);
  }

  const result = await request.text().then((res) => JSON.parse(res));
  return result;
};

export const editCollectionImage = async (file, collectionId) => {
  const URL = EDIT_COLLECTION_COVER_URL(collectionId);

  const formData = new FormData();
  formData.append('cover', file);

  const request = await fetch(URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  });

  if (!request.ok) return false;

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const editCollectionBanner = async (file, collectionId) => {
  const URL = EDIT_COLLECTION_BANNER_URL(collectionId);

  const formData = new FormData();
  formData.append('banner', file);

  const request = await fetch(URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: formData,
  });

  // if (!request.ok) return false;

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const getUserNfts = async (username) => {
  const URL = GET_USER_NFTS_URL(username);

  const request = await fetch(URL);

  const result = await request.text().then((data) => JSON.parse(data));

  return result;
};

export const getNftData = async (collectionAddress, tokenId) => {
  const URL = `${GET_NFT_INFO}/${collectionAddress}/${tokenId}`;

  const request = await fetch(URL);

  const result = await request.text().then((data) => JSON.parse(data));
  return result;
};

export const createMintingNFT = async (txHash, nftId, actualMintedCount) => {
  const URL = `${CREATE_MINTING_NFT}/${nftId}`;

  const request = await fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify({
      txHash,
      numberOfEditions: actualMintedCount,
    }),
  });

  return true;
  // const result = await request.text().then((data) => JSON.parse(data));
  // console.log(result);
  // return result;
};
