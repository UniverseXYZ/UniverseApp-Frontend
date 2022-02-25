import { TokenTicker } from '../enums';
import { IToken } from '../types';

import ETHWhiteIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import ETHIcon from './../../assets/images/v2/tokens/ETH_white.svg';
import USDCIcon from './../../assets/images/v2/tokens/USDC.svg';
import DAIIcon from './../../assets/images/v2/tokens/DAI.svg';
import XYZIcon from './../../assets/images/v2/tokens/XYZ.svg';
import WETHIcon from './../../assets/images/v2/tokens/WETH.svg';
import Contracts from '../../contracts/contracts.json';

export const TOKENS_MAP: Record<TokenTicker, IToken> = {
  [TokenTicker.ETH]: {
    ticker: TokenTicker.ETH,
    decimals: 18,
    name: 'Ethereum',
    icons: [ETHWhiteIcon, ETHIcon],
    coingeckoId: 'ethereum'
  },
  [TokenTicker.USDC]: {
    ticker: TokenTicker.USDC,
    decimals: 6,
    name: 'USDC Coin',
    icons: [USDCIcon],
    contractName: 'USDC',
    coingeckoId: 'usd-coin'
  },
  [TokenTicker.DAI]: {
    ticker: TokenTicker.DAI,
    decimals: 18,
    name: 'DAI Stablecoin',
    icons: [DAIIcon],
    contractName: 'DAI',
    coingeckoId: 'dai'
  },
  [TokenTicker.XYZ]: {
    ticker: TokenTicker.XYZ,
    decimals: 18,
    name: 'XYZ Governance Token',
    icons: [XYZIcon],
    contractName: 'XYZ',
    coingeckoId: 'universe-xyz'
  },
  [TokenTicker.WETH]: {
    ticker: TokenTicker.WETH,
    decimals: 18,
    name: 'Wrapped Ether',
    icons: [WETHIcon],
    contractName: 'WrappedEther',
    coingeckoId: 'ethereum'
  },
};

export const TOKENS = Object.keys(TOKENS_MAP).map((ticker) => TOKENS_MAP[ticker as TokenTicker]);

export const getTokenByAddress = (tokenAddress: string) => {
  // @ts-ignore
  const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  let token = undefined;

  Object.keys(contractsData).forEach((contractName: string) => {
    const contract = contractsData[contractName];

    if (contract.address && contract.address.toLowerCase() === tokenAddress.toLowerCase()) {
      token =  TOKENS_MAP[contractName as TokenTicker];
    }
  })

  return token || TOKENS_MAP[TokenTicker.WETH];
}
