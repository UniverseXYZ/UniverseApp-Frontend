import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown, DropdownFilterContainer, MultiSelect } from '../../../../../components';

import { ICollectionsFilterValue } from '../collections-filter';
import { Image } from '@chakra-ui/react';
import { FilterArtistsItems } from '../../../mocks/filter-artists';

import artistIcon from '../../../../../../assets/images/marketplace/artist.svg';

type IFormValues = any[];

interface IArtistsFilterProps {
  value: any[];
  onChange: (values: IFormValues) => void;
  onClear: () => void;
}

export const ArtistsFilter = ({ value: _value, onChange, onClear }: IArtistsFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<ICollectionsFilterValue>([]);

  const handleChange = useCallback((value: any[]) => {
    // console.log('handleChange', value);
    setValue(value);
  }, []);

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
      label={'Artists'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={artistIcon} /> }}
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
          items={FilterArtistsItems}
          value={value}
          icon={artistIcon}
          searchPlaceholder={'Search artists'}
          isRoundedImage={true}
          onChange={handleChange}
          onSave={handleSave}
          onClear={handleClear}
        />
      </DropdownFilterContainer>
    </Dropdown>
  );
  // return (
    // <MultiSelect
    //   items={items}
    //   label={'Artists'}
    //   icon={artistIcon}
    //   searchPlaceholder={'Search artists'}
    //   isRoundedImage={true}
    //   onChange={onChange}
    //   onClear={onClear}
    // />
  // );
};
