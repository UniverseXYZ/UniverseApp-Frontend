/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-properties */
import { ethers } from 'ethers';

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatEtherWithDecimals = (ether, decimals) => {
  const parsed = +ethers.utils.formatEther(ether);
  return decimals ? parsed.toFixed(decimals) : parsed;
};

export const shortenEnsDomain = (ens) => {
  const ensArray = ens.split('.eth');
  if (ensArray[0].length < 15) return ens;
  return `${ensArray[0].substring(0, 12)}...eth`;
};

export const shortenEthereumAddress = (address) =>
  `${address.substring(0, 5)}...${address.substring(address.length - 6, address.length)}`;

export const toFixed = (num, fixed) => {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
};

export const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const toFixedEth = (x) => {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1], 10);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(x.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
};
