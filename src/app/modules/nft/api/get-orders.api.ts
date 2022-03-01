import axios from 'axios';
import { ethers } from 'ethers';

import { OrderAssetClass } from '../enums';
import { IOrder, IOrderBackend } from '../types';
import { mapBackendOrder } from '../helpers';


export interface IGetOrdersApiParams {
  page: number;
  limit: number;
  maker: string;
  side: 0 | 1;
  assetClass: OrderAssetClass;
  collection: string;
  tokenId: number;
}

export interface IGeBestAndLastApiParams {
  collection: string;
  tokenId: string;
}

export type IGetOrdersApiResponse = [IOrderBackend[], number];
export type IGetBestAndLastOfferResponse = {
  bestOffer: IOrder,
  lastOffer: IOrder
};

export type IGetOrdersApiFn = (params: Partial<IGetOrdersApiParams>) => Promise<{ orders: IOrder[], total: number; }>;
export type IGetBestAndLastApiFn = (collection:string, tokenId:string) => Promise<IGetBestAndLastOfferResponse>;

export const GetOrdersApi: IGetOrdersApiFn = async (params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders`;

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse>(url, { params });

  return { total, orders: orders.map((order) => mapBackendOrder(order)) };
};

export const GetActiveSellOrdersApi: IGetOrdersApiFn = async (params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/browse`;

  if (params.collection) {
    params.collection = ethers.utils.getAddress(params.collection);
  }

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse>(url, { params });

  return { total, orders: orders.map((order) => mapBackendOrder(order)) };
};


export const GetBestAndLastOffer: IGetBestAndLastApiFn = async (collection:string, tokenId:string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/card/${collection.toLowerCase()}/${tokenId}`;

  const { data: {lastOffer, bestOffer} } = await axios.get<IGetBestAndLastOfferResponse>(url);

  return {lastOffer, bestOffer}
};

