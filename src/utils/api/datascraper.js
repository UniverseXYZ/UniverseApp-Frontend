const GET_TOKENS_PER_ADDRESS = (address, page, perPage) =>
  `${process.env.REACT_APP_DATASCRAPER_API}/v1/users/${address}/tokens?page=${page}&size=${perPage}`;

/**
 *
 * @param {string} address
 * @param {int} page
 * @param {int} perPage
 * @returns {array} of tokens for a particular user
 */
export const getNftsPerAddress = async (address, page, perPage) => {
  const request = await fetch(GET_TOKENS_PER_ADDRESS(address, page, perPage));
  const result = await request.json();
  return result;
};
