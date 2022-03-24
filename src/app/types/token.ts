import { TokenTicker } from '../enums';

export interface IToken {
  ticker: TokenTicker;
  decimals: number;
  name: string;
  icons: string[];
  coingeckoId: string;
  contractName?: string;
}
