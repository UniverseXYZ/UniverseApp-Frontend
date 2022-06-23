import axios from 'axios';
import { ICollectionOrderBookData } from '@app/modules/collection/types';
import { OrderAssetClass } from '@app/modules/nft/enums';
import {
  IOrder,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
  IOrderBackend,
} from '@app/modules/nft/types';
import { mapBackendOrder } from '@app/modules/nft';

export interface IGetOrdersApiParams {
  page: number;
  limit: number;
  maker: string;
  side: 0 | 1;
  assetClass: OrderAssetClass;
  collection: string;
  tokenIds: string;
}

export type IGetOrdersApiResponse<M, T> = [
  IOrderBackend<M, T>[],
  number
];
export type IGetOrdersApiFn = <M, T>(params: Partial<IGetOrdersApiParams>) => Promise<{
  total: number;
  orders: Array<IOrder<M, T>>,
}>;

// TODO: Create a specific endpoint for fetching buy orders for a specific sell order.
// This endpoint is very generic and is not optimized
export const GetOrdersApi: IGetOrdersApiFn = async <M, T>(params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders`;

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse<M, T>>(url, { params });

  return {
    total,
    orders: orders.map((order) => mapBackendOrder(order)),
  };
};

export const GetActiveSellOrdersApi: IGetOrdersApiFn = async <M, T>(params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/browse`;

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse<M, T>>(url, { params });

  return {
    total,
    orders: orders.map((order) => mapBackendOrder(order)),
  };
};

export type IGetActiveListingFn = (collection:string, tokenId:string) => Promise<IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20> | undefined>;
export const GetActiveListingApi: IGetActiveListingFn = async (collection:string, tokenId:string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/listing/${collection}/${tokenId}`;

  const { data } = await axios.get<IOrderBackend<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>>(url);

  return data ? mapBackendOrder(data) : undefined;
};

export type IGetBestAndLastOfferResponse = {
  bestOffer: IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>,
  lastOffer: IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>,
};
export type IGetBestAndLastApiFn = (collection: string, tokenId: string) => Promise<IGetBestAndLastOfferResponse>;
export const GetBestAndLastOffer: IGetBestAndLastApiFn = async (collection, tokenId) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/card/${collection.toLowerCase()}/${tokenId}`;
  const { data } = await axios.get<IGetBestAndLastOfferResponse>(url);
  return data;
};

/**
 * Fetches collection additional data
 * @param address collection address
 * @returns returns floor price and volume traded
 */
export const GetCollectionOrderBookData = async (address: string) : Promise<ICollectionOrderBookData> => {
  try {
    const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/collection/${address}`;

    const { data: { floorPrice, volumeTraded } } = await axios.get<ICollectionOrderBookData>(url);

    return {
      floorPrice,
      volumeTraded
    };
  } catch (e) {
    console.log(e);
    return {} as ICollectionOrderBookData;
  }
};

