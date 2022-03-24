import { utils } from 'ethers';
import { TOKENS_MAP } from '../constants';

export const formatPrice = (price: string): string => {
  let _floorPrice = '';

  if (price) {
    _floorPrice = utils.formatUnits(price, `${TOKENS_MAP.ETH.decimals}`);

    if (_floorPrice?.length > 5) {
      if (_floorPrice.includes('.')) {
        // parse to float first to assure that trailing zeros are not displayed to the user
        _floorPrice = parseFloat(_floorPrice.substring(0, 5)).toString();
      }

      if (_floorPrice === '0') {
        _floorPrice = '< 0.001';
      }
    }
  }

  return _floorPrice || price;
};
