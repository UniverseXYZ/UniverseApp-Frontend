import { useMemo } from 'react';
import { useErc20PriceStore } from '../../stores/erc20PriceStore';
import { TokenTicker } from '../enums';

export const useTokenPrice = (ticker: TokenTicker) => {
  const { getTokenPriceByTicker, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice } = useErc20PriceStore();

  return useMemo(() => {
    return getTokenPriceByTicker(ticker);
  }, [ticker, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice])
}
