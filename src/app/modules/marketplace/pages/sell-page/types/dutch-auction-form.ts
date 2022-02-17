import { ICurrencyInputValue } from '../../../../../components';
import { IBaseForm } from './base-form';

export interface IDutchAuctionForm extends IBaseForm {
  price: ICurrencyInputValue;
  endingPrice: ICurrencyInputValue;
  expirationDate: Date | null;
  isScheduledForFutureTime: boolean;
  futureDate: Date | null;
  isPrivacy: boolean;
  buyerAddress: string;
}
