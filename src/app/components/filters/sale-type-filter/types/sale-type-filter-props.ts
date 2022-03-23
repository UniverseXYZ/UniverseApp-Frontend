import { ISaleTypeFilterValue } from './sale-type-filter-value';

export interface ISaleTypeFilterProps {
  value: ISaleTypeFilterValue;
  onChange: (value: ISaleTypeFilterValue) => void;
}
