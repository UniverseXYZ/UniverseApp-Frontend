import { utils } from 'ethers';

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
