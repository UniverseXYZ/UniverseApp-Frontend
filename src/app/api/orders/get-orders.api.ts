import axios from 'axios';

import { OrderAssetClass } from '../../modules/nft/enums';
import { IOrder, IOrderBackend } from '../../modules/nft/types';
import { mapBackendOrder } from '../../modules/nft/helpers';

export interface IGetOrdersApiParams {
  page: number;
  limit: number;
  maker: string;
  side: 0 | 1;
  assetClass: OrderAssetClass;
  collection: string;
  tokenIds: string;
}

export type IGetOrdersApiResponse = [IOrderBackend[], number];
export type IGetBestAndLastOfferResponse = {
  bestOffer: IOrder,
  lastOffer: IOrder
};

export type IGetOrdersApiFn = (params: Partial<IGetOrdersApiParams>) => Promise<{ orders: IOrder[], total: number; }>;
export type IGetBestAndLastApiFn = (collection:string, tokenId:string) => Promise<IGetBestAndLastOfferResponse>;
export type IGetActiveListingFn = (collection:string, tokenId:string) => Promise<IOrder | null>;

// TODO: Create a specific endpoint for fetching buy orders for a specific sell order.
// This endpoint is very generic and is not optimized
export const GetOrdersApi: IGetOrdersApiFn = async (params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders`;

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse>(url, { params });

  return { total, orders: orders.map((order) => mapBackendOrder(order)) };
};

export const GetActiveListingApi: IGetActiveListingFn = async (collection:string, tokenId:string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/listing/${collection}/${tokenId}`;

  const {data: order} = await axios.get<IOrderBackend>(url);

  return order ? mapBackendOrder(order) : null
};


export const GetActiveSellOrdersApi: IGetOrdersApiFn = async (params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/browse`;


  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse>(url, { params });

  return { total, orders: orders.map((order) => mapBackendOrder(order)) };
};


export const GetBestAndLastOffer: IGetBestAndLastApiFn = async (collection:string, tokenId:string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/card/${collection.toLowerCase()}/${tokenId}`;

  const { data: {lastOffer, bestOffer} } = await axios.get<IGetBestAndLastOfferResponse>(url);

  return {lastOffer, bestOffer}
};

