import { createContext } from 'react';

import { IMarketplaceSellContextData } from '../types';

export const MarketplaceSellContext = createContext<IMarketplaceSellContextData>({} as IMarketplaceSellContextData);
