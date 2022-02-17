import { IBaseForm } from './base-form';

export interface IEnglishAuctionForm extends IBaseForm {
  minBit: string;
  minBitCurrency: string;
  reservePrice: string;
  reservePriceCurrency: string;
  expirationDate: Date | null;
}
