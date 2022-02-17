import { HistoryType } from '../../../../../enums';

export const nameLabels: Record<HistoryType, string> = {
  [HistoryType.BID]: 'Bit by',
  [HistoryType.BOUGHT]: 'Bought by',
  [HistoryType.MINTED]: 'Minted by',
  [HistoryType.PUT_ON_SALE]: 'Put on sale by',
  [HistoryType.LISTED]: 'Listed by',
  [HistoryType.OFFER]: 'Offer by',
};
