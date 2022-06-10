import create from "zustand";
import { getAllTokenPricesCoingecko } from "../utils/api/etherscan";
import { TokenTicker } from "../app/enums";
import { useUserBalanceStore } from "./balanceStore";

interface IErc20PriceStoreState {
  // Getters
  ethUsdPrice: number;
  daiUsdPrice: number;
  usdcUsdPrice: number;
  xyzUsdPrice: number;
  wethUsdPrice: number;

  // Helpers
  fetchPrices: () => void;
  getTokenPriceByTicker: (ticker: TokenTicker) => number;
}

interface TokenPrice {
  symbol: string;
  updatedAt: Date;
  usd: number;
  name: string;
}

const findTokenPrice = (tokenPrices: TokenPrice[], token: string) => {
  return tokenPrices.find((tokenPriceData: TokenPrice) => tokenPriceData.name === token);
}

export const useErc20PriceStore = create<IErc20PriceStoreState>((set, get) => ({
  // initial state
  ethUsdPrice: 0,
  daiUsdPrice: 0,
  usdcUsdPrice: 0,
  xyzUsdPrice: 0,
  wethUsdPrice: 0,
  // fetching functions
  fetchPrices: async () => {
    try {
      const tokenPrices: TokenPrice[] = await getAllTokenPricesCoingecko();
      const ethPrice = findTokenPrice(tokenPrices, 'ethereum');
      const daiInfo = findTokenPrice(tokenPrices, 'dai');
      const usdcInfo = findTokenPrice(tokenPrices, 'usd-coin');
      const xyzInfo = findTokenPrice(tokenPrices, 'universe-xyz');
      const wethInfo = findTokenPrice(tokenPrices, 'weth');

      console.log(`wethPrice: ${wethInfo?.usd}`);
      console.log(`ethPrice: ${ethPrice?.usd}`);
      console.log(`usdcPrice: ${usdcInfo?.usd}`);
      console.log(`daiPrice: ${daiInfo?.usd}`);
      console.log(`xyzPrice: ${xyzInfo?.usd}`);
      
      set(() => ({
        ethUsdPrice: ethPrice?.usd ?? 0,
        daiUsdPrice: daiInfo?.usd ?? 0,
        usdcUsdPrice: usdcInfo?.usd ?? 0,
        xyzUsdPrice: xyzInfo?.usd ?? 0,
        wethUsdPrice: wethInfo?.usd ?? 0
      }));

      const newUsdPrice = get().ethUsdPrice;
      useUserBalanceStore.getState().setUsdEthBalance(newUsdPrice);
    } catch (err) {
      console.log('coingecko price fetching failed');
      console.log(err);
    }
  },
  // getters
  getTokenPriceByTicker: (ticker: TokenTicker) => {
    switch (ticker) {
      case TokenTicker.ETH:
        return get().ethUsdPrice;
      case TokenTicker.USDC:
        return get().usdcUsdPrice;
      case TokenTicker.DAI:
        return get().daiUsdPrice;
      case TokenTicker.WETH:
        return get().wethUsdPrice;
      case TokenTicker.XYZ:
        return get().xyzUsdPrice;
      default:
        return get().ethUsdPrice;
    }
  }
}))