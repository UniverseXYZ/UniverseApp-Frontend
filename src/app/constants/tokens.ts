import { Tokens } from '../enums';
import { IToken } from '../types';

import ETHWhiteIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import ETHIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import USDCIcon from './../../assets/images/v2/tokens/USDC.svg';
import DAIIcon from './../../assets/images/v2/tokens/DAI.svg';
import XYZIcon from './../../assets/images/v2/tokens/XYZ.svg';
import WETHIcon from './../../assets/images/v2/tokens/WETH.svg';

export const TOKENS_MAP: Record<Tokens, IToken> = {
  [Tokens.ETH]: {
    ticker: Tokens.ETH,
    decimals: 18,
    name: 'Ethereum',
    icons: [ETHWhiteIcon, ETHIcon],
  },
  [Tokens.USDC]: {
    ticker: Tokens.USDC,
    decimals: 6,
    name: 'USDC Coin',
    icons: [USDCIcon],
  },
  [Tokens.DAI]: {
    ticker: Tokens.DAI,
    decimals: 18,
    name: 'DAI Stablecoin',
    icons: [DAIIcon],
  },
  [Tokens.XYZ]: {
    ticker: Tokens.XYZ,
    decimals: 18,
    name: 'XYZ Governance Token',
    icons: [XYZIcon],
  },
  [Tokens.WETH]: {
    ticker: Tokens.WETH,
    decimals: 18,
    name: 'Wrapped Ether',
    icons: [WETHIcon],
  },
};

export const TOKENS = Object.keys(TOKENS_MAP).map((ticker) => TOKENS_MAP[ticker as Tokens]);
