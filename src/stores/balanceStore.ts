import create from "zustand";
import { useErc20PriceStore } from "./erc20PriceStore";

interface IBalanceStore {
  // Getters
  yourBalance: number;
  usdEthBalance: number;

  // Setters
  setYourBalance: (newBalance: number) => void;
  setUsdEthBalance: (newBalance: number) => void;
}

export const useUserBalanceStore = create<IBalanceStore>((set, get) => ({
  yourBalance: 0,
  usdEthBalance: 0,
  setYourBalance: (newBalance: number) => {
    const usdEthBalance = useErc20PriceStore.getState().ethUsdPrice;
    set(state => ({
      ...state,
      yourBalance: newBalance,
      usdEthBalance: newBalance * usdEthBalance
    }))
  },
  setUsdEthBalance: (newPrice: number) => {
    const newUsdBalance = get().yourBalance * newPrice;
    set(state => ({
      ...state,
      usdEthBalance: newUsdBalance
    }))
  }
}))