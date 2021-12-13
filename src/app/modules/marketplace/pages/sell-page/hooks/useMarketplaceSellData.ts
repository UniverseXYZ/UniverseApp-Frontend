import { useContext } from 'react';

import { MarketplaceSellContext } from '../constants';
import { IMarketplaceSellContextData } from '../types';

export const useMarketplaceSellData: () => IMarketplaceSellContextData = () => useContext(MarketplaceSellContext);
