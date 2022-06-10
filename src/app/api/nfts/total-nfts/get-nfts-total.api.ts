import axios from 'axios';
import querystring from 'query-string';

interface IGetTotalNFTsResponse {
  count: number;
}

export const getCollectionNFTsTotalApi = async (address: string) => {
  const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS}/nfts`;

  const queryParams = querystring.stringify({
    action: 'count',
    contractAddress: address,
  });

  const { data } = await axios.get<IGetTotalNFTsResponse>(`${url}?${queryParams}`);

  return data.count;
}

export const getArtistNFTsTotalApi = async (address: string) => {
  const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS}/nfts`;

  const queryParams = querystring.stringify({
    action: 'count',
    ownerAddress: address,
  });

  const { data } = await axios.get<IGetTotalNFTsResponse>(`${url}?${queryParams}`);

  return data.count;
}
