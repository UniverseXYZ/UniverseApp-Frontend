import axios from 'axios';

import { IOrder } from '@app/modules/nft/types';

export interface IEncodeOrderApiData<M, T> extends Pick<IOrder<M, T>,
  |'make'
  |'maker'
  |'take'
  |'salt'
  |'start'
  |'end'
  |'taker'
  |'type'
  |'data'
> {}

export const EncodeOrderApi = <M, T>(data: IEncodeOrderApiData<M, T>) => {
  return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
};
