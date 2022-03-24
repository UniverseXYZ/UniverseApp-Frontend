import { SellMethod } from '../enums';

export const settingsMethodsTitleText: Record<SellMethod, string> = {
  [SellMethod.FIXED]: 'Fixed Listing',
  [SellMethod.DUTCH]: 'Dutch auction',
  [SellMethod.ENGLISH]: 'English auction',
};
