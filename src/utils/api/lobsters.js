import axios from 'axios';

/**
 * @param {string} id NFT id
 * @returns
 */
export const getLobsterMeta = async (id) => {
  const request = await axios(`${process.env.REACT_APP_LOBSTER_IMAGES_URL}${id}`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (request.status !== 200) {
    console.error(`Error while trying to GET meta for Polymorph with ID: ${id}`);
  }
  return request;
};

/**
 * @param {Array} metadataURIs metadata URIs
 * @returns
 */
export const fetchTokensMetadataJson = async (metadataURIs) => {
  const metadataPromises = [];
  for (let i = 0; i < metadataURIs?.length; i += 1) {
    metadataPromises.push(axios(metadataURIs[i]));
  }
  return Promise.all(metadataPromises);
};
