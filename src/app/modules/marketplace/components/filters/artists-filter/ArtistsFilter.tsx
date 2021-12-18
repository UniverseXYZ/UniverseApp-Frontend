import React from 'react';

import { MultiSelect } from '../../../../../components';

import artistIcon from '../../../../../../assets/images/marketplace/artist.svg';

type IFormValues = any[];

interface IArtistsFilterProps {
  items: any[];
  onChange: (values: IFormValues) => void;
  onClear: () => void;
}

export const ArtistsFilter = ({ items, onChange, onClear }: IArtistsFilterProps) => {
  return (
    <MultiSelect
      items={items}
      label={'Artists'}
      icon={artistIcon}
      searchPlaceholder={'Search artists'}
      isRoundedImage={true}
      onChange={onChange}
      onClear={onClear}
    />
  );
};
