import { IFixedListingForm } from '../types';

export const defaultFixedListingForm: IFixedListingForm = {
  bundleName: '',
  bundleDescription: '',
  bundleSelectedNFTs: [],
  price: '',
  priceCurrency: 'ETH',
  startDate: null,
  endDate: null,
  isPrivacy: false,
  buyerAddress: '',
};
