import { utils } from 'ethers';

const GET_TOKENS_PER_ADDRESS = (address: string, page: number, perPage: number) =>
  `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/users/${address}/tokens?page=${page}&size=${perPage}`;

const GET_NFTS_PER_COLLECTION = (address: string, page: number) =>
  `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/collections/${utils.getAddress(
    address
  )}/tokens?page=${page}&size=8`;

const GET_COLLECTION_DATA = (address: String) =>
  `${process.env.REACT_APP_API_BASE_URL}/api/pages/collection/${address}`;

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

export const getCollectionData = async (address: string, page: number) => {
  const request = await fetch(GET_COLLECTION_DATA(address));
  const result = await request.json();
  console.log(request);

  const nfts = await fetch(GET_NFTS_PER_COLLECTION(address, page));
  console.log(nfts);
  result.nfts = await nfts.json();

  return result;
};

export const getNftsPerAddress = async (address: string, page: number, perPage: number) => {
  const request = await fetch(GET_TOKENS_PER_ADDRESS(address, page, perPage));
  const result = await request.json();
  return result;
};

export const sendReportRequest = async (values: any) => {
  const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
    body: JSON.stringify(values),
  });

  return result;
};

export const sendRefreshMetadataRequest = async (collectionAddress: string, tokenId: string) => {
  const result = await fetch(`${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/refresh`, {
    method: 'PUT',
    body: JSON.stringify({
      contractAddress: utils.getAddress(collectionAddress),
      tokenId,
    }),
  });

  return result;
};
