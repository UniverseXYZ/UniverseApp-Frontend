import { IEnglishAuctionForm } from '../types';

export const defaultEnglishAuctionForm: IEnglishAuctionForm = {
  bundleName: '',
  bundleDescription: '',
  bundleSelectedNFTs: [],
  minBit: {
    value: 0,
    currency: 'ETH',
  },
  reservePrice: {
    value: 0,
    currency: 'ETH',
  },
  expirationDate: null,
};
