import { IBaseForm } from './base-form';

export interface IDutchAuctionForm extends IBaseForm {
  price: string;
  priceCurrency: string;
  endingPrice: string;
  endingPriceCurrency: string;
  expirationDate: Date | null;
  isScheduledForFutureTime: boolean;
  futureDate: Date | null;
  isPrivacy: boolean;
  buyerAddress: string;
}
