import { TokenTicker } from '../enums';
import { IToken } from '../types';

import ETHWhiteIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import ETHIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import USDCIcon from './../../assets/images/v2/tokens/USDC.svg';
import DAIIcon from './../../assets/images/v2/tokens/DAI.svg';
import XYZIcon from './../../assets/images/v2/tokens/XYZ.svg';
import WETHIcon from './../../assets/images/v2/tokens/WETH.svg';

export const TOKENS_MAP: Record<TokenTicker, IToken> = {
  [TokenTicker.ETH]: {
    ticker: TokenTicker.ETH,
    decimals: 18,
    name: 'Ethereum',
    icons: [ETHWhiteIcon, ETHIcon],
  },
  [TokenTicker.USDC]: {
    ticker: TokenTicker.USDC,
    decimals: 6,
    name: 'USDC Coin',
    icons: [USDCIcon],
    // TODO add contractName
  },
  [TokenTicker.DAI]: {
    ticker: TokenTicker.DAI,
    decimals: 18,
    name: 'DAI Stablecoin',
    icons: [DAIIcon],
    // TODO add contractName
  },
  [TokenTicker.XYZ]: {
    ticker: TokenTicker.XYZ,
    decimals: 18,
    name: 'XYZ Governance Token',
    icons: [XYZIcon],
    // TODO add contractName
  },
  [TokenTicker.WETH]: {
    ticker: TokenTicker.WETH,
    decimals: 18,
    name: 'Wrapped Ether',
    icons: [WETHIcon],
    contractName: 'WrappedEther'
  },
};

export const TOKENS = Object.keys(TOKENS_MAP).map((ticker) => TOKENS_MAP[ticker as TokenTicker]);
