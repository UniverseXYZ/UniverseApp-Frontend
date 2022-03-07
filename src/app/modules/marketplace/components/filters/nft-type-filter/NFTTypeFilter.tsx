import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Checkbox, Dropdown, DropdownFilterContainer } from '../../../../../components';
import { NftTypeFilterOptions } from './constants';
import { INFTTypeFilterProps, INftTypeFilterValue } from './types';

import nftTypeIcon from '../../../../../../assets/images/v2/marketplace/filter-nft-type.svg';

export const NFTTypeFilter = ({ value: _value, onChange, onClear }: INFTTypeFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<INftTypeFilterValue>({} as INftTypeFilterValue);

  const handleSave = useCallback(() => {
    onChange(value);
    setIsOpened(false);
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    setValue(_value);
    onClear();
  }, [_value, onClear]);

  const handleChangeOption = useCallback((optionName: keyof INftTypeFilterValue, optionValue: boolean) => {
    setValue({ ...value, [optionName]: optionValue });
  }, [value]);

  const valueLabel = useMemo(() => {
    const selectedOptions = NftTypeFilterOptions.reduce<Array<[number, number]>>((acc, optionGroup, i) => {
      optionGroup.options.forEach((option, j) => {
        if (_value[option.key]) {
          acc.push([i, j]);
        }
      })
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${NftTypeFilterOptions[selectedOptions[0][0]].options[selectedOptions[0][1]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, [_value]);

  useEffect(() => setValue(_value), [_value]);

  return (
    <Dropdown
      label={'NFT type'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={nftTypeIcon} /> }}
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
        {NftTypeFilterOptions.map((optionsGroup, i) => (
          <Box key={i} sx={{
            mb: '40px',
            _last: {
              mb: 0,
            }
          }}>
            <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'} fontWeight={500} mb={'20px'}>{optionsGroup.name}</Text>
            <SimpleGrid columns={2} spacingY={'20px'}>
              {optionsGroup.options.map(({ key, label }) => (
                <Box key={key}>
                  <Checkbox
                    size={'lg'}
                    isChecked={value[key]}
                    onChange={(e) => handleChangeOption(key, e.target.checked)}
                  >{label}</Checkbox>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </DropdownFilterContainer>
    </Dropdown>
  );
};
