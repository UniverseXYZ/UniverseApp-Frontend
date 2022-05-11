import axios from 'axios';

export const GetSaltApi = (address: string) => {
  return axios.get(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/salt/${address}`);
};
