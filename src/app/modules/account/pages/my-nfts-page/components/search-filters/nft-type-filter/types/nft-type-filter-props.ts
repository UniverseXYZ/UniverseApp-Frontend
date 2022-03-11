import { INftTypeFilterValue } from './nft-type-filter-value';

export interface INFTTypeFilterProps {
  value: INftTypeFilterValue;
  onChange: (value: INftTypeFilterValue) => void;
}
