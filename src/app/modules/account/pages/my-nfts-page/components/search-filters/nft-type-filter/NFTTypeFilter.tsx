import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import NFTTypeIcon from '../../../../../../../../assets/images/v2/marketplace/filter-nft-type.svg';

import { Checkbox, Dropdown, DropdownFilterContainer } from '../../../../../../../components';
import { NftTypeFilterOptions } from './constants';
import { INFTTypeFilterProps, INftTypeFilterValue } from './types';

export const NFTTypeFilter = (props: INFTTypeFilterProps) => {
  const { value, onChange } = props;

  const handleChangeOption = useCallback((optionName: keyof INftTypeFilterValue, optionValue: boolean) => {
    onChange({ ...value, [optionName]: optionValue });
  }, [value]);

  return (
    <>
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
    </>
  );
};

export interface INFTTypeFilterDropdownProps {
  value: INftTypeFilterValue;
  onSave: (value: INftTypeFilterValue) => void;
  onClear: () => void;
}

export const NFTTypeFilterDropdown = (props: INFTTypeFilterDropdownProps) => {
  const {
    value: initialValue,
    onSave,
    onClear,
  } = props;

  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<INftTypeFilterValue>({} as INftTypeFilterValue);

  const handleSave = useCallback(() => {
    onSave(value);
    setIsOpened(false);
  }, [value, onSave]);

  const handleClear = useCallback(() => {
    setValue(initialValue);
    onClear();
  }, [initialValue, onClear]);

  const valueLabel = useMemo(() => {
    const selectedOptions = NftTypeFilterOptions.reduce<Array<[number, number]>>((acc, optionGroup, i) => {
      optionGroup.options.forEach((option, j) => {
        if (initialValue[option.key]) {
          acc.push([i, j]);
        }
      })
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${NftTypeFilterOptions[selectedOptions[0][0]].options[selectedOptions[0][1]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, [initialValue]);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Dropdown
      label={'NFT type'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={NFTTypeIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(initialValue);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        onSave={handleSave}
        onClear={handleClear}
      >
        <NFTTypeFilter value={value} onChange={(value) => setValue(value)} />
      </DropdownFilterContainer>
    </Dropdown>
  );
};
