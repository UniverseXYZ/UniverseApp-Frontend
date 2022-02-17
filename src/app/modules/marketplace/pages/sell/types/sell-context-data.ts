import { SellAmountType, SellMethod } from '../enums';

export interface IMarketplaceSellContextData {
  selectAmount: (amountType: SellAmountType) => void;
  selectMethod: (amountType: SellMethod) => void;
  backToSettings: () => void;
  save: () => void;
}
