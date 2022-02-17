import { IFixedListingForm } from '../types/fixed-listing-form';

export const defaultFixedListingForm: IFixedListingForm = {
  NFT: null,
  NFTs: [],
  bundleName: '',
  bundleDescription: '',
  price: {
    value: 0,
    currency: 'ETH',
  },
  isPrivacy: false,
  buyerAddress: '',
};
