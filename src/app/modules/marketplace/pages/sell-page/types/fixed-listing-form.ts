import { IBaseForm } from './base-form';

export interface IFixedListingForm extends IBaseForm {
  price: string;
  priceCurrency: string;
  startDate: Date | null;
  endDate: Date | null;
  isPrivacy: boolean;
  buyerAddress: string;
}
