import { INftTypeFilterValue } from './nft-type-filter-value';

export interface INFTTypeFilterProps {
  value: INftTypeFilterValue;
  onChange: (values: INftTypeFilterValue) => void;
  onClear: () => void;
}
