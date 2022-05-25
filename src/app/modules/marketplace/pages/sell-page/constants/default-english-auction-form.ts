import { IEnglishAuctionForm } from '../types';

export const defaultEnglishAuctionForm: IEnglishAuctionForm = {
  bundleName: '',
  bundleDescription: '',
  bundleSelectedNFTs: [],
  amount: 1,
  minBit: '',
  minBitCurrency: 'ETH',
  reservePrice: '',
  reservePriceCurrency: 'ETH',
  expirationDate: null,
};
