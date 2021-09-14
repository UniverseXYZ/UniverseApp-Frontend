import ethIcon from '../../assets/images/eth-icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';

const bidTypes = [
  {
    value: 'eth',
    name: 'ETH',
    img: ethIcon,
    subtitle: 'Ether',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
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
    value: 'usdc',
    name: 'USDC',
    img: usdcIcon,
    subtitle: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
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
    value: 'snx',
    name: 'SNX',
    img: snxIcon,
    subtitle: 'Synthetix Network Token',
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    decimals: 18,
  },
];

export const getBidTypeByValue = (val, options) => options.find((bidType) => bidType.value === val);

export default bidTypes;
