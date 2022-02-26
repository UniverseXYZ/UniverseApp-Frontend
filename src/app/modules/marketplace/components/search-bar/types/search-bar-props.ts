import { ISearchBarValue } from './search-bar-value';
import { ISearchBarDropdownCollection } from '../../../../nft/types';

export interface ISearchBarProps {
  value: ISearchBarValue;
  onChange: (values: ISearchBarValue) => void;
  onClear: () => void;
  onItemSelect: (itemAddress: string) => void;
  collections: ISearchBarDropdownCollection[];
  isFetchingCollections: boolean;
}
