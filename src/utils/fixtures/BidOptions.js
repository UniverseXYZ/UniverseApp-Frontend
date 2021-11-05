import ethIcon from '../../assets/images/eth-icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import wethIcon from '../../assets/images/WETH 20x20.svg';
import wbtcIcon from '../../assets/images/WBTC 20x20.svg';
import aaveIcon from '../../assets/images/aave 20x20.png';
import compIcon from '../../assets/images/COMP 20x20.svg';
import ilvIcon from '../../assets/images/ILV 20x20.png';
import linkIcon from '../../assets/images/LINK 20x20.svg';
import sushiIcon from '../../assets/images/sushi 20x20.png';
import xyzIcon from '../../assets/images/XYZ 20x20.png';

let bidTypes = [];
const chainId = +process.env.REACT_APP_NETWORK_CHAIN_ID;

if (chainId === 1) {
  bidTypes = [
    {
      value: 'eth',
      name: 'ETH',
      img: ethIcon,
      subtitle: 'Ether',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    {
      value: 'weth',
      name: 'WETH',
      img: wethIcon,
      subtitle: 'Wrapped Ether',
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
    },
    {
      value: 'wbtc',
      name: 'WBTC',
      img: wbtcIcon,
      subtitle: 'Wrapped Bitcoin',
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 18,
    },
    {
      value: 'usdc',
      name: 'USDC',
      img: usdcIcon,
      subtitle: 'USD Coin',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
    },
    {
      value: 'dai',
      name: 'DAI',
      img: daiIcon,
      subtitle: 'DAI Stablecoin',
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
    },
    {
      value: 'aave',
      name: 'AAVE',
      img: aaveIcon,
      subtitle: 'AAVE Token',
      address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
      decimals: 18,
    },
    {
      value: 'link',
      name: 'LINK',
      img: linkIcon,
      subtitle: 'Chainlink Token',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      decimals: 18,
    },
    {
      value: 'snx',
      name: 'SNX',
      img: snxIcon,
      subtitle: 'Synthetix Network Token',
      address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
      decimals: 18,
    },
    {
      value: 'comp',
      name: 'COMP',
      img: compIcon,
      subtitle: 'Compound Governance Token',
      address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
      decimals: 18,
    },
    {
      value: 'bond',
      name: 'BOND',
      img: bondIcon,
      subtitle: 'BarnBridge Governance Token',
      address: '0x0391D2021f89DC339F60Fff84546EA23E337750f',
      decimals: 18,
    },
    {
      value: 'ilv',
      name: 'ILV',
      img: ilvIcon,
      subtitle: 'Illuvium Token',
      address: '0x767fe9edc9e0df98e07454847909b5e959d7ca0e',
      decimals: 18,
    },
    {
      value: 'sushi',
      name: 'SUSHI',
      img: sushiIcon,
      subtitle: 'SUSHI Token',
      address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      decimals: 18,
    },
    {
      value: 'xyz',
      name: 'XYZ',
      img: xyzIcon,
      subtitle: 'XYZ Governance Token',
      address: '0x618679dF9EfCd19694BB1daa8D00718Eacfa2883',
      decimals: 18,
    },
  ];
} else if (chainId === 4) {
  bidTypes = [
    {
      value: 'eth',
      name: 'ETH',
      img: ethIcon,
      subtitle: 'Ether',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    {
      value: 'weth',
      name: 'WETH',
      img: wethIcon,
      subtitle: 'Wrapped Ether',
      address: '0xc778417e063141139fce010982780140aa0cd5ab',
      decimals: 18,
    },
  ];
}

export const getBidTypeByValue = (val, options) => options.find((bidType) => bidType.value === val);

export default [...bidTypes];
