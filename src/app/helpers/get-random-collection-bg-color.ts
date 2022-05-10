import { defaultColors } from '@legacy/helpers';

import { getStrHashCode } from './get-str-hash-code';

export const getRandomCollectionBGColor = (address: string | null | undefined) => {
  const index = Math.abs(getStrHashCode(address || '') % defaultColors.length);
  return defaultColors[index];
};
