import { INftTypeFilterValue } from './nft-type-filter-value';

export interface INftTypeFilterOptions {
  name: string;
  options: Array<{
    key: keyof INftTypeFilterValue;
    label: string;
  }>;
}
