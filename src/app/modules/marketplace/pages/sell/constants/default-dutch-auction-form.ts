import { IDutchAuctionForm } from '../types';

export const defaultDutchAuctionForm: IDutchAuctionForm = {
  NFT: null,
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
