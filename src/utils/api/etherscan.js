import { fetchJson } from '@ethersproject/web';

export const getEthPriceEtherscan = async () => {
  const result = await fetchJson(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${
      process.env.REACT_APP_ETHERSCAN_API_KEY || 'Y2UTKP86K5EYBGZ64YIH6N3IBGNQAJ8M21'
    }`
  );
  return result;
};

export const getTokenPriceCoingecko = async (token) => {
  return await fetchJson(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/tokenPrices/${token}`);
};

export const getAllTokenPricesCoingecko = async () => {
  return await fetchJson(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/tokenPrices`);
};
