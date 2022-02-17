import { ICurrencyInputValue } from '../../../../../components';
import { IBaseForm } from './base-form';

export interface IFixedListingForm extends IBaseForm {
  price: ICurrencyInputValue;
  isPrivacy: boolean;
  buyerAddress: string;
}
