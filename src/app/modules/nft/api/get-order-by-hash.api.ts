import axios from 'axios';

import { IOrderBackend } from '../types';
import { mapBackendOrder } from '../helpers';

export const GetOrderByHashApi = async (hash: string) => {
  const url = `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/${hash}`;
  const { data } = await axios.get<IOrderBackend>(url);

  return mapBackendOrder(data);
}
