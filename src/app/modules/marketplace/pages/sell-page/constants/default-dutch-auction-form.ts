import { IDutchAuctionForm } from '../types';

export const defaultDutchAuctionForm: IDutchAuctionForm = {
  selectedNFTsIds: {},
  bundleName: '',
  bundleDescription: '',
  price: {
    value: 0,
    currency: 'ETH',
  },
  endingPrice: {
    value: 0,
    currency: 'ETH',
  },
  expirationDate: null,
  isScheduledForFutureTime: false,
  futureDate: null,
  isPrivacy: false,
  buyerAddress: '',
};
