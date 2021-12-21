import { ICollectionsFilterValue } from './collections-filter-value';

export interface ICollectionsFilterProps {
  value: ICollectionsFilterValue;
  onChange: (values: ICollectionsFilterValue) => void;
  onClear: () => void;
}
