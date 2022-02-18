const GET_TOKENS_PER_ADDRESS = (address, page, perPage) =>
  `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/users/${address}/tokens?page=${page}&size=${perPage}`;

/**
 *
 * @param {string} address
 * @param {int} page
 * @param {int} perPage
 * @returns {array} of NFT objects
 * [
 *  {_id,
 *  contractAddress,
 *  tokenId,
 *  createdAt,
 *  needToRefresh,
 *  alternativeMediaFiles: [{type, url}], firstOwner, owners: [{address, transactionHash, value}],
 *  tokenType,
 *  updatedAt,
 *  sentAt,
 *  externalDomainViewUrl,
 *  metadata: {description, name, image, attributes: [], external_url},
 *  sentForMediaAt
 *  ]
 */

export const getNftsPerAddress = async (address, page, perPage) => {
  const request = await fetch(GET_TOKENS_PER_ADDRESS(address, page, perPage));
  const result = await request.json();
  return result;
};
