import { IFixedListingForm } from '../types';

export const defaultFixedListingForm: IFixedListingForm = {
  NFT: null,
  selectedNFTsIds: {},
  bundleName: '',
  bundleDescription: '',
  price: {
    value: 0,
    currency: 'ETH',
  },
  isPrivacy: false,
  buyerAddress: '',
};
