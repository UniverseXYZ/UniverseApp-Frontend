import { IEnglishAuctionForm } from '../types/english-auction-form';

export const defaultEnglishAuctionForm: IEnglishAuctionForm = {
  NFT: null,
  NFTs: [],
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
