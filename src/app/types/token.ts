import { Tokens } from '../enums';

export interface IToken {
  ticker: Tokens;
  decimals: number;
  name: string;
  icons: string[];
}
