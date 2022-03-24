import { IDutchAuctionForm } from '../types';

export const defaultDutchAuctionForm: IDutchAuctionForm = {
  bundleName: '',
  bundleDescription: '',
  bundleSelectedNFTs: [],
  price: '',
  priceCurrency: 'ETH',
  endingPrice: '',
  endingPriceCurrency: 'ETH',
  expirationDate: null,
  isScheduledForFutureTime: false,
  futureDate: null,
  isPrivacy: false,
  buyerAddress: '',
};
