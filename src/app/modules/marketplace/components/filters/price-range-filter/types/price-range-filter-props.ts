import { IPriceRangeFilterValue } from './price-range-filter-value';

export interface IPriceRangeFilterProps {
  value: IPriceRangeFilterValue;
  isDirty: boolean;
  onChange: (values: IPriceRangeFilterValue) => void;
  onClear: () => void;
}
