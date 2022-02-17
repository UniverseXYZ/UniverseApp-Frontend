import { IDutchAuctionForm } from '../types/dutch-auction-form';

export const defaultDutchAuctionForm: IDutchAuctionForm = {
  NFT: null,
  NFTs: [],
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
