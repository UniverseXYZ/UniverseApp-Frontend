const SAVE_FOR_LATER_MINT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_SAVED_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts`;
const GET_MY_NFTS_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/my-nfts`;
const GENERATE_TOKEN_URI_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/token-uri`;
const GENERATE_COLLECTION_NFT_URI_URL = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/minting-collections`;
const GET_MY_COLLECTIONS = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/collections/my-collections`;
const GET_MY_NFTS = `${process.env.REACT_APP_API_BASE_URL}/api/nfts/my-nfts`;

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
  console.log(data.collectionId, data.royaltiesParsed);
  const requestData = {
    name: data.name,
    description: data.description,
    numberOfEditions: parseInt(data.editions, 10),
    properties: data.properties,
    royalties: data.royaltiesParsed,
    collectionId: data.collectionId,
  };

  const request = await fetch(SAVE_FOR_LATER_MINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      ...requestData,
    }),
  });

  console.log(request);

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
  if (data.royaltiesParsed.length)
    formData.append('royalties', JSON.stringify(data.royaltiesParsed));

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
    body: JSON.stringify({
      txHash,
    }),
  };

  return fetch(`${GENERATE_COLLECTION_NFT_URI_URL}/${collectionId}`, requestOptions);
};

export const removeSavedNft = (id) =>
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/saved-nfts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  });

export const getMyCollections = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  };

  return fetch(GET_MY_COLLECTIONS, requestOptions);
};

// Mock GET requests

/**
 * @returns {array} with mock NFTs
 * use the mock property previewImageMock to get the image
 * use the mock property royaltiesMock to get the royalties
 * use the mock property collectionAvatarMock to get the collectionAvatar
 */
export const getMockNfts = () => {
  const data = [
    {
      id: 0,
      type: 'collection',
      collectionId: 156,
      collectionName: 'collection mock 1',
      collectionAvatar: {},
      collectionDescription: 'description of collection',
      shortURL: 'universe.xyz/c/mock1',
      tokenName: 'MCK',
      previewImage: false,
      name: 'Nft Mock',
      description: 'nft description',
      numberOfEditions: 1,
      generatedEditions: ['acbbf15'],
      properties: [{ name: 'property 1', value: '10' }],
      percentAmount: '',
      releasedDate: '2021-07-27T12:09:04.540Z',
      royaltiesMock: [['0x87d709e3b1a2508D371fdFAA2Ae91FFC82061979', 1000]],
      previewImageMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/3eeaa8a78c4fb8b514a41b75a6796ebea31c92f0de8ea8c6.jpeg',
      collectionAvatarMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/3eeaa8a78c4fb8b514a41b75a6796ebea31c92f0de8ea8c6.jpeg',
    },
    {
      id: 1,
      type: 'collection',
      collectionId: 156,
      collectionName: 'collection mock 1',
      collectionAvatar: {},
      collectionDescription: 'description of collection',
      shortURL: 'universe.xyz/c/mock2',
      tokenName: 'MCK2',
      previewImage: false,
      name: 'Nft Mock 2',
      description: 'nft description 2',
      numberOfEditions: 1,
      generatedEditions: ['acbbf15'],
      properties: [],
      percentAmount: '',
      releasedDate: '2021-07-27T12:09:04.540Z',
      previewImageMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/fba87735a4ef3959bc096b092d95dd36386aa3755c8d268f.png',
      collectionAvatarMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/3eeaa8a78c4fb8b514a41b75a6796ebea31c92f0de8ea8c6.jpeg',
    },
    {
      id: 2,
      type: 'collection',
      collectionId: 157,
      collectionName: 'collection mock 2',
      collectionAvatar: {},
      collectionDescription: 'description of collection 2',
      shortURL: 'universe.xyz/c/mock3',
      tokenName: 'MCK3',
      previewImage: false,
      name: 'Nft Mock 3',
      description: 'nft description 3',
      numberOfEditions: 1,
      generatedEditions: ['acbbf15'],
      properties: [],
      percentAmount: '',
      releasedDate: '2021-07-27T12:09:04.540Z',
      royaltiesMock: [
        ['0x87d709e3b1a2508D371fdFAA2Ae91FFC82061979', 1000],
        ['0xb4B8512972E4d4A76bDBf7F3eFC65aEfF6DdF313', 2000],
      ],
      previewImageMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/fba87735a4ef3959bc096b092d95dd36386aa3755c8d268f.png',
      collectionAvatarMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/fba87735a4ef3959bc096b092d95dd36386aa3755c8d268f.png',
    },
  ];

  return data;
};

/**
 * @returns {array} with mock collections
 * use the mock property previewImageMock to get the image
 */
export const getMockCollections = () => {
  const data = [
    {
      id: 156,
      previewImage: false,
      name: 'collection mock 1',
      tokenName: 'ART',
      description: 'description of collection',
      shortURL: 'universe.xyz/c/collectionmock',
      previewImageMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/3eeaa8a78c4fb8b514a41b75a6796ebea31c92f0de8ea8c6.jpeg',
    },
    {
      id: 157,
      previewImage: false,
      name: 'collection mock 2',
      tokenName: 'ART2',
      description: 'description of collection 2',
      shortURL: 'universe.xyz/c/collectionmock2',
      previewImageMock:
        'https://universeapp-assets-dev.s3.amazonaws.com/fba87735a4ef3959bc096b092d95dd36386aa3755c8d268f.png',
    },
  ];

  return data;
};
