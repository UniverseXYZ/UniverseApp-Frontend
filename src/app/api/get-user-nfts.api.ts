import axios from 'axios';
import { INFT } from '../modules/nft/types';
import { mapNft } from '../modules/nft/api';
interface IUserNFTsResponse {
  data: any[];
  page: number;
  size: string;
  total: number;
}

export interface IGetUserNFTsProps {
  address: string;
  page: string | number;
  size: string | number;
  search?: string;
  tokenType?: string;
  tokenAddress?: string;
}

export const getUserNFTsApi = async (props: IGetUserNFTsProps) => {
  let url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/users/${props.address}/tokens?page=${props.page}&size=${props.size}`;

  if (props.search) {
    url = url.concat('&search=' + props.search);
  }

  if (props.tokenType) {
    url = url.concat('&tokenType=' + props.tokenType);
  }

  if (props.tokenAddress) {
    url = url.concat('&tokenAddress=' + props.tokenAddress);
  }

  const { data: { data, ...responseData } } = await axios.get<IUserNFTsResponse>(url);

  return {
    data: data.map((nft) => mapNft(nft, null)) as INFT[],
    ...responseData,
  }
};
