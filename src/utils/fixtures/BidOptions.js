import ethIcon from '../../assets/images/eth-icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';

export default [
  {
    value: 'eth',
    name: 'ETH',
    img: ethIcon,
    subtitle: 'Ether',
    address: 'address',
  },
  {
    value: 'dai',
    name: 'DAI',
    img: daiIcon,
    subtitle: 'DAI Stablecoin',
    address: '',
  },
  {
    value: 'usdc',
    name: 'USDC',
    img: usdcIcon,
    subtitle: 'USD Coin',
    address: 'address',
  },
  {
    value: 'bond',
    name: 'BOND',
    img: bondIcon,
    subtitle: 'BarnBridge Governance Token',
    address: '',
  },
  {
    value: 'snx',
    name: 'SNX',
    img: snxIcon,
    subtitle: 'Synthetix Network Token',
    address: '',
  },
];
