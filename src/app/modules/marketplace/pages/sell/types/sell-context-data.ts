export interface IMarketplaceSellContextData {
  selectAmount: (amountType: string) => void; // TODO: replace amountType string --> enum
  selectMethod: (amountType: string) => void; // TODO: replace amountType string --> enum
  backToSettings: () => void;
  save: () => void;
}
