import { IBaseForm } from './base-form';

export interface IFixedListingForm extends IBaseForm {
  price: string;
  priceCurrency: string;
  isPrivacy: boolean;
  buyerAddress: string;
}
