import axios from 'axios';

const GET_META_URL = `https://us-central1-polymorphmetadata.cloudfunctions.net/images-function?id=`;

/**
 * @param {string} id NFT id
 * @returns
 */
export const getPolymorphMeta = async (id) => {
  const request = await axios(`${GET_META_URL}${id}`, {
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
