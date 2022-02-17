import axios from 'axios';

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

export type IGetOrdersApiResponse = [IOrderBackend[], number];

export type IGetOrdersApiFn = (params: Partial<IGetOrdersApiParams>) => Promise<{ orders: IOrder[], total: number; }>;

export const GetOrdersApi: IGetOrdersApiFn = async (params = {}) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/`;

  const { data: [orders, total] } = await axios.get<IGetOrdersApiResponse>(url, { params });

  return { total, orders: orders.map((order) => mapBackendOrder(order)) };
};
