import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from '@chakra-ui/react';

import { Dropdown, DropdownFilterContainer, MultiSelect } from '../../../../../components';
import { ICollectionsFilterProps, ICollectionsFilterValue } from './types';
import { FilterCollectionsItems } from '../../../mocks/filter-collections';

import collectionsIcon from '../../../../../../assets/images/marketplace/collections.svg';

export const CollectionsFilter = ({ value: _value, onChange, onClear }: ICollectionsFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<ICollectionsFilterValue>([]);

  const handleChange = useCallback((value: any[]) => {
    // console.log('handleChange', value);
    setValue(value);
  }, []);
  console.log(value)
  const handleSave = useCallback(() => {
    onChange(value);
    setIsOpened(false);
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    setValue(_value);
    onClear();
  }, [_value, onClear]);

  const valueLabel = useMemo(() => {
    // const selectedOptions = NftTypeFilterOptions.reduce<Array<[number, number]>>((acc, optionGroup, i) => {
    //   optionGroup.options.forEach((option, j) => {
    //     if (_value[option.key]) {
    //       acc.push([i, j]);
    //     }
    //   })
    //   return acc;
    // }, []);
    //
    // if (!selectedOptions.length) {
    //   return null;
    // }
    //
    // return `${NftTypeFilterOptions[selectedOptions[0][0]].options[selectedOptions[0][1]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
    return null;
  }, [_value]);

  useEffect(() => setValue(_value), [_value]);

  return (
    <Dropdown
      label={'Collections'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={collectionsIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(_value);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        padding={0}
        onSave={handleSave}
        onClear={handleClear}
      >
        <MultiSelect
          inline={true}
          items={FilterCollectionsItems}
          value={value}
          icon={collectionsIcon}
          searchPlaceholder={'Search collections'}
          onChange={handleChange}
          onSave={handleSave}
          onClear={handleClear}
        />
      </DropdownFilterContainer>
    </Dropdown>
  );

  // return (
  //   <MultiSelect
  //     items={FilterCollectionsItems}
  //     label={'Collections'}
  //     icon={collectionsIcon}
  //     searchPlaceholder={'Search collections'}
  //     onChange={handleSave}
  //     onClear={handleClear}
  //   />
  // );
}
