import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ISearchBarProps, ISearchBarValue } from './types';
import { ISearchBarDropdownCollection } from '../../../nft/types';

import collectionsIcon from '../../../../../assets/images/marketplace/collections.svg';
import { SearchSelect } from './SelectSearch';
import { FilterCollectionsItems } from '../../mocks/filter-collections';

const DEFAULT_COLLECTIONS: ISearchBarDropdownCollection[] = FilterCollectionsItems;

export const SearchBar = ({
  value: _value,
  onChange,
  onClear,
  onItemSelect,
  collections,
  isFetchingCollections,
}: ISearchBarProps) => {
  const [items, setItems] = useState<ISearchBarDropdownCollection[]>(DEFAULT_COLLECTIONS);

  const handleChange = useCallback((value: ISearchBarValue) => {
    onChange(value);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onClear();
  }, [_value, onClear]);

  useEffect(() => {
    // If the collection search has returned anything show it
    if (collections.length) {
      setItems(collections);
    } else if (_value.searchValue.length) {
      // If the collection search has returned nothing
      setItems([]);
    } else {
      // If there is no search value show the defaults
      setItems(DEFAULT_COLLECTIONS);
    }
  }, [collections]);

  return (
    <SearchSelect
      items={items}
      isFetchingCollections={isFetchingCollections}
      icon={collectionsIcon}
      searchPlaceholder={'Search collections'}
      onChange={handleChange}
      onItemSelect={onItemSelect}
      onClear={handleClear}
    />
  );
}
