import { SellAmountType, SellMethod } from '../enums';

export interface IMarketplaceSellContextData {
  form: any;
  selectAmount: (amountType: SellAmountType) => void;
  selectMethod: (amountType: SellMethod) => void;
  goBack: () => void;
  goContinue: () => void;
  save: () => void;
}
