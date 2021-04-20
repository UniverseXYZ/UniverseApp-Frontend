import { ethers } from "ethers"


export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export const formatEtherWithDecimals = (ether, decimals) => {
    const parsed = +ethers.utils.formatEther(ether);
    return decimals ? parsed.toFixed(decimals) : parsed;
} 

export const shortenEthereumAddress = (address) => address.substring(0,5) + "..." + address.substring(address.length - 6, address.length);

export const toFixed = (num, fixed) => {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}