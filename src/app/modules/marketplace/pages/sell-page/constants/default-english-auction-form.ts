import { IEnglishAuctionForm } from '../types';

export const defaultEnglishAuctionForm: IEnglishAuctionForm = {
  NFT: null,
  selectedNFTsIds: {},
  bundleName: '',
  bundleDescription: '',
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
