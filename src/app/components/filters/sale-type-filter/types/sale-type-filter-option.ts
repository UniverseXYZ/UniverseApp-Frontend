import { ISaleTypeFilterValue } from './sale-type-filter-value';

export interface ISaleTypeFilterOption {
  key: keyof ISaleTypeFilterValue;
  label: string;
  description: string;
}
