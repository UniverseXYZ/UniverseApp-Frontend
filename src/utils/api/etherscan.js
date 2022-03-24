import { fetchJson } from '@ethersproject/web';

export const getEthPriceEtherscan = async () => {
  const result = await fetchJson(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${
      process.env.REACT_APP_ETHERSCAN_API_KEY || 'Y2UTKP86K5EYBGZ64YIH6N3IBGNQAJ8M21'
    }`
  );
  return result;
};

export const getEthPriceCoingecko = async () => {
  const result = await fetchJson(`https://api.coingecko.com/api/v3/coins/ethereum`);
  return result;
};

export const getERC20PriceCoingecko = async (erc20token) => {
  const result = await fetchJson(`https://api.coingecko.com/api/v3/coins/${erc20token}`);
  return result;
};
