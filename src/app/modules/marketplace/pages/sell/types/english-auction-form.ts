import { ICurrencyInputValue } from '../../../../../components';
import { IBaseForm } from './base-form';

export interface IEnglishAuctionForm extends IBaseForm {
  minBit: ICurrencyInputValue;
  reservePrice: ICurrencyInputValue;
  expirationDate: Date | null;
}
