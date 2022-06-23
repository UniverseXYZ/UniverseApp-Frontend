import axios from 'axios';

import { IOrderBackend } from '../../modules/nft/types';
import { mapBackendOrder } from '../../modules/nft/helpers';

export const GetOrderByHashApi = async <M, T>(hash: string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}`;
  const { data } = await axios.get<IOrderBackend<M, T>>(url);

  return mapBackendOrder<M, T>(data);
}
