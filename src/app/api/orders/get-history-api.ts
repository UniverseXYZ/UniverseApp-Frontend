import axios from 'axios';
import Cookies from 'js-cookie';
import { utils } from 'ethers';
import { ZERO_ADDRESS } from '../../constants';
import { OrderSide, OrderStatus } from '../../modules/marketplace/enums';
import { IOrder, IUser } from '../../modules/nft/types';
import { GetUserApi } from '..';

export interface INFTTransfer {
  contractAddress: string;
  blockNum: number;
  hash: string;
  matchedTxHash: string;
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
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/listing/${collectionAddress.toLowerCase()}/${tokenId}/history`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get('xyz_access_token')}`,
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
      if (order.side === OrderSide.BUY && order.status === OrderStatus.FILLED) {
        const listingOrder = {
          ...order,
          id: `${order.id}-listing`,
          createdAt: order.createdAt,
          side: OrderSide.BUY,
          status: OrderStatus.CREATED,
          modified: true
        }
        orderHistory.push(listingOrder);
        order.createdAt = order.updatedAt;
      } else if (order.side === OrderSide.SELL && order.status === OrderStatus.FILLED) {
        const listingOrder = {
          ...order,
          createdAt: order.createdAt,
          side: OrderSide.SELL,
          status: OrderStatus.CREATED,
          modified: true
        }
        orderHistory.push(listingOrder);
        order.createdAt = order.updatedAt;
        order.maker = order.taker;
      }
      if (order.maker) {
        order.makerData = await GetUserApi(order.maker);
      }
    }
    
    if (mintEvent) {
      mintEvent.makerData = await GetUserApi(mintEvent.to);
      mintEvent.matchedTxHash = mintEvent.hash;
    }

    return {
      orderHistory: orderHistory.sort((a, b) => {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
      }),
      mintEvent: mintEvent
    }
};
