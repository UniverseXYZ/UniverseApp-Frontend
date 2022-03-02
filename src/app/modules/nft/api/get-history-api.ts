import axios from 'axios';
import { utils } from 'ethers';
import { ZERO_ADDRESS } from '../../../constants';
import { GetUserApi } from '../api';
import { IOrder, IUser } from '../types';

export interface INFTTransfer {
  contractAddress: string;
  blockNum: number;
  hash: string;
  from: string;
  to: string;
  tokenId: string;
  value: string;
  erc721TokenId: string;
  erc1155Metadata: any;
  cryptopunks: any;
  category: string;
  timeLastUpdated: string;
  makerData: IUser | undefined;
}
export interface INFTHistory {
  orderHistory: IOrder[];
  mintEvent: INFTTransfer;
}
// Call to the scraper to get nft transfers and use the first one(mint)
const getTransferData = async (collectionAddress: string, tokenId: string) => {
  const url = `${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/transfers/${utils.getAddress(collectionAddress)}/${tokenId}`;
  
  const { data } = await axios.get(url);

  return data;
}

const getHistoryData = async (collectionAddress: string, tokenId: string): Promise<[IOrder[], number]> => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders?collection=${collectionAddress}&tokenId=${tokenId}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xyz_access_token')}`,
    },
  });

  return data;
}

export const GetHistoryApi = async (collectionAddress: string, tokenId: string): Promise<INFTHistory> => {

  const [transferResponse, orderHistoryResponse] = await Promise.all([
    getTransferData(collectionAddress, tokenId),
    getHistoryData(collectionAddress, tokenId)
  ])

  const mintEvent: INFTTransfer = transferResponse.data.find((data: INFTTransfer) => data.from === ZERO_ADDRESS);
  const orderHistory = orderHistoryResponse[0];
    // Api call to get the order creator or the minter data
    for (let i = 0; i < orderHistory.length; i++) {
      const order = orderHistory[i];
      if (order.maker) {
        order.makerData = await GetUserApi(order.maker);
      }
    }
    
    if (mintEvent) {
      mintEvent.makerData = await GetUserApi(mintEvent.to);
    }

    return {
      orderHistory: orderHistory,
      mintEvent: mintEvent
    }
};
