import React from 'react';

import { MultiSelect } from '../../../../../components';

import collectionsIcon from '../../../../../../assets/images/marketplace/collections.svg';

type IFormValues = any[];

interface ICollectionsFilterProps {
  items: any[];
  onChange: (values: IFormValues) => void;
  onClear: () => void;
}

export const CollectionsFilter = ({ items, onChange, onClear }: ICollectionsFilterProps) => {
  return (
    <MultiSelect
      items={items}
      label={'Collections'}
      icon={collectionsIcon}
      searchPlaceholder={'Search collections'}
      onChange={onChange}
      onClear={onClear}
    />
  );
}
