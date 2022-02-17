import React from 'react';
import { Select } from '../select';
import { SortNftsOptions } from '../../modules/marketplace/constants';

export const CurrencySelect = () => {
  return (
    <Select
      label={''}
      items={SortNftsOptions}
      value={'sortBy'}
      buttonProps={{
        mr: '12px',
        // size: 'lg',
        minWidth: '225px',
        justifyContent: 'space-between',
        isFullWidth: true,
      }}
      onSelect={(val) => {}}
    />
  );
};
