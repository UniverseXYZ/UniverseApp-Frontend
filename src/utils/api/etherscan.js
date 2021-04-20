import Contracts from "../../contracts/contracts.json";
import { fetchJson } from '@ethersproject/web';

export const getEthPriceEtherscan = async () => {
    return await fetchJson(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY || "Y2UTKP86K5EYBGZ64YIH6N3IBGNQAJ8M21"}`
    );
  };

export const getWethBalanceEtherscan = async (address, chainId) => {
    const wethContract = Contracts[chainId].contracts.WrappedEther.address;
    return await fetchJson(
      `https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${wethContract}&address=${address}&tag=latest&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY || "Y2UTKP86K5EYBGZ64YIH6N3IBGNQAJ8M21"}`
    );
  };