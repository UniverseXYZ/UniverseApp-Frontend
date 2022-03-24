import { IPriceRangeFilterValue } from './price-range-filter-value';

export interface IPriceRangeFilterProps {
  value: IPriceRangeFilterValue;
  onChange: (value: IPriceRangeFilterValue) => void;
}
