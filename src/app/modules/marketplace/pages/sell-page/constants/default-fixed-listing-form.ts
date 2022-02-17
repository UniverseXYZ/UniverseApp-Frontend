import { IFixedListingForm } from '../types';

export const defaultFixedListingForm: IFixedListingForm = {
  bundleName: '',
  bundleDescription: '',
  bundleSelectedNFTs: [],
  price: {
    value: 0,
    currency: 'ETH',
  },
  isPrivacy: false,
  buyerAddress: '',
};
