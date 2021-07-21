const SAVE_FOR_LATER_MINT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_SAVED_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;

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
    properties: data.properties,
    royalties: parseFloat(data.percentAmount),
  };

  const request = await fetch(SAVE_FOR_LATER_MINT_URL, {
    credentials: 'include',
    method: 'POST',
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
 * @param {array} data.properties
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
    properties: data.properties,
    royalties: parseFloat(data.percentAmount),
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

export const getTokenURI = async (data) => {
  const formData = new FormData();
  const noProperties = !data.properties[0]?.name && !data.properties[0]?.name;

  formData.append('file', data.file, data.file.name);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('numberOfEditions', parseInt(data.editions, 10));
  if (noProperties) formData.append('properties', JSON.stringify(data.properties));
  if (data.percentAmount) formData.append('royalties', parseFloat(data.percentAmount));

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

export const generateTokenURIForCollection = async (data) => {
  // UniverseERC721Factory
  const formData = new FormData();

  formData.append('file', data.file, data.file.name);
  formData.append('name', data.name);
  formData.append('symbol', data.symbol);
  formData.append('description', data.description);
  formData.append('shortUrl', data.shortUrl);

  const request = await fetch(GENERATE_COLLECTION_NFT_URI_URL, {
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
  formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('symbol', symbol);
  formData.append('description', description);
  formData.append('shortUrl', shortUrl);

  const requestUrl = GENERATE_COLLECTION_NFT_URI_URL;
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
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    txHash,
  };

  return fetch(`${GENERATE_COLLECTION_NFT_URI_URL}/${collectionId}`, requestOptions);
};

export const removeSavedNft = (id) =>
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  });
