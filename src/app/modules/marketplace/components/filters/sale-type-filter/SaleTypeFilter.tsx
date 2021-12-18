import { Box, Checkbox, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown, DropdownFilterContainer } from '../../../../../components';
import { SaleTypeFilterOptions } from './constants';
import { ISaleTypeFilterProps, ISaleTypeFilterValue } from './types';

import saleTypeIcon from '../../../../../../assets/images/marketplace/sale-type.svg';

export const SaleTypeFilter = ({ value: _value, onChange, onClear }: ISaleTypeFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<ISaleTypeFilterValue>({} as ISaleTypeFilterValue);

  const handleSave = useCallback(() => {
    onChange(value);
    setIsOpened(false);
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    setValue(_value);
    onClear();
  }, [_value, onClear]);

  const handleChangeOption = useCallback((optionName: keyof ISaleTypeFilterValue, optionValue: boolean) => {
    setValue({ ...value, [optionName]: optionValue });
  }, [value]);

  const valueLabel = useMemo(() => {
    const selectedOptions = SaleTypeFilterOptions.reduce<number[]>((acc, option, i) => {
      if (_value[option.key]) {
        acc.push(i);
      }
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${SaleTypeFilterOptions[selectedOptions[0]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, [_value]);

  useEffect(() => setValue(_value), [_value]);

  return (
    <Dropdown
      label={'Sale type'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={saleTypeIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(_value);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        onSave={handleSave}
        onClear={handleClear}
      >
        <SimpleGrid columns={2} spacingY={'20px'}>
          {SaleTypeFilterOptions.map(({ key, label, description }) => (
            <Box key={key}>
              <Checkbox size={'lg'} isChecked={value[key]} onChange={(e) => handleChangeOption(key, e.target.checked)}>
                <Text fontSize={'14px'} fontWeight={500}>{label}</Text>
                <Text color={'#00000066'} fontSize={'12px'} fontWeight={400}>{description}</Text>
              </Checkbox>
            </Box>
          ))}
        </SimpleGrid>
      </DropdownFilterContainer>
    </Dropdown>
  );
};
