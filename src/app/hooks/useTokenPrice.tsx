import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { TokenTicker } from '../enums';

export const useTokenPrice = (ticker: TokenTicker) => {
  const { getTokenPriceByTicker, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice } = useAuthContext() as any

  const [tokenPrice, setTokenPrice] = useState(0);
  const [tick, setTick] = useState(ticker);

  useEffect(() => {
    setTick(ticker)
  }, [ticker])
  
  useEffect(() => {
    const usdPrice = getTokenPriceByTicker(tick);
    setTokenPrice(usdPrice);
  }, [tick, ethUsdPrice, daiUsdPrice, usdcUsdPrice, xyzUsdPrice, wethUsdPrice])
  

  return tokenPrice;
}
