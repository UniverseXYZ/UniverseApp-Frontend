import { IFixedListingForm } from './fixed-listing-form';
import { IDutchAuctionForm } from './dutch-auction-form';
import { IEnglishAuctionForm } from './english-auction-form';

export type ISellForm = IFixedListingForm
  | IDutchAuctionForm
  | IEnglishAuctionForm;
