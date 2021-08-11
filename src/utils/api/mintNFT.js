/* eslint-disable no-useless-return */
const SAVE_FOR_LATER_MINT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_SAVED_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_MY_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/my-nfts`;
const GENERATE_TOKEN_URI_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/token-uri`;
const CREATE_COLLECTION_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/minting-collections`;
const GET_MY_COLLECTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/collections/my-collections`;

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
    description: data.description,
    numberOfEditions: parseInt(data.editions, 10),
    properties: data.propertiesParsed.length ? data.propertiesParsed : null,
    royalties: data.royaltiesParsed.length ? data.royaltiesParsed : null,
  };

  if (data.collectionId) requestData.collectionId = data.collectionId;

  const request = await fetch(SAVE_FOR_LATER_MINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });

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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
  const request = await fetch(GET_MY_NFTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to GET saved NFTS info: ${request.statusText}`);
  }
  const result = await request.text().then((data) => JSON.parse(data));
  return result.nfts;
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
    description: data.description,
    numberOfEditions: parseInt(data.editions, 10),
    properties: data.propertiesParsed?.length ? data.propertiesParsed : null,
    royalties: data.royaltiesParsed?.length ? data.royaltiesParsed : null,
    collectionId: data.collectionId ? data.collectionId : null,
  };

  const request = await fetch(UPDATE_SAVED_FOR_LATER_NFT_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
 * @returns
 */
export const getTokenURI = async ({
  file,
  name,
  description,
  editions,
  propertiesParsed,
  royaltiesParsed,
}) => {
  const formData = new FormData();
  const noProperties = propertiesParsed?.length;
  const noRoyalties = royaltiesParsed?.length;

  formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('numberOfEditions', parseInt(editions, 10));
  if (noProperties) formData.append('properties', JSON.stringify(propertiesParsed));
  if (noRoyalties) formData.append('royalties', JSON.stringify(royaltiesParsed));

  const request = await fetch(GENERATE_TOKEN_URI_URL, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: formData,
  });

  const result = await request.text().then((res) => JSON.parse(res));

  return result;
};

export const saveCollection = async (data) => {
  const { file, name, symbol, description, shortUrl } = data;

  const formData = new FormData();
  if (file) formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('symbol', symbol);
  formData.append('description', description);
  formData.append('shortUrl', shortUrl);

  const requestUrl = CREATE_COLLECTION_URL;
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  if (!request.ok && request.status !== 201) {
    console.error(`Error while trying to save NFT data: ${request.statusText}`);
  }
};

export const getMyCollections = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  };

  const myCollectionsStream = await fetch(GET_MY_COLLECTIONS, requestOptions);
  const reader = myCollectionsStream.body.getReader();

  const collectionsArray = [];

  const read = async () => {
    const { done, value } = await reader.read();

    if (!done) {
      const decoder = new TextDecoder();
      const collectionsResult = value && (await JSON.parse(decoder.decode(value)));
      if (collectionsResult) collectionsArray.push(...collectionsResult.collections);

      await read();
    }
  };

  await read();

  return collectionsArray;
};
