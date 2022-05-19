import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import PropertiesIcon from '@assets/images/v2/marketplace/filter-properties.svg';
import ArrowIcon from '@assets/images/accordion-arrow.svg';
import { CollectionsFilter, ICollectionsValue } from '@app/components/filters';
import { Checkbox, Dropdown, DropdownFilterContainer, SearchInput } from '@app/components';

import * as styles from './PropertiesFilter.styles';

interface IPropertiesFilterProps {
  collectionAddress: string;
  items?: ICollectionsValue[];
  searchPlaceholder?: string;
  value: number;
  onChange: (value: number) => void;
}

export const PropertiesFilter = (props: IPropertiesFilterProps) => {
  const {
    collectionAddress,
    items = [],
    searchPlaceholder = 'Search',
    value,
    onChange
  } = props;

  const [searchValue, setSearchValue] = useState<string>('');

  const { data } = useQuery<Array<{ trait_type: string; value: string[]; }>>(['properties', collectionAddress], async () => {
    console.log(`${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${collectionAddress}/token-attributes`);
    const { data } = await axios.get(`${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${collectionAddress}/token-attributes`);
    return data;
  });

  const onSearch = useCallback((searchValue: any) => {
    setSearchValue(searchValue.target.value);
  }, []);

  const handleToggleItem = useCallback((item) => {
    onChange(1);
  }, [value, onChange]);

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return [...items].filter(collection => collection.name?.toLowerCase().includes(searchValue));
  }, [items, searchValue]);

  return (
    <>
      <Box p={0} pb={'18px'}>
        <SearchInput
          shadowProps={{
            display: 'contents',
          }}
          inputGroupProps={{
            sx: {
              '.chakra-input__left-element': {
                height: '42px',
                width: '42px',
              }
            }
          }}
          inputProps={{
            height: '42px',
            pl: '42px',
            placeholder: searchPlaceholder,
          }}
          value={searchValue}
          onChange={onSearch}
        />
      </Box>
      <Box {...styles.WrapperStyle}>
        <Accordion allowToggle allowMultiple>
          {data?.map((group, i) => (
            <AccordionItem key={i} {...styles.AccordionItemStyle}>
              <h2>
                <AccordionButton {...styles.AccordionButtonStyle}>
                  <Box flex='1' textAlign='left' fontSize={'16px'} fontWeight={600}>
                    {group.trait_type}
                    <Box {...styles.GroupItemsAmountLabelStyle}>{group.value.length}</Box>
                  </Box>
                  <Image src={ArrowIcon} />
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                {group.value.map((value, j) => (
                  <Box key={j} py={'6px'} _first={{ pt: 0 }} _last={{ pb: '20px' }}>
                    <Checkbox size={'lg'}>{value}</Checkbox>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
};

interface IPropertiesFilterDropdownProps {
  items?: ICollectionsValue[];
  searchPlaceholder?: string;
  value: number;
  collectionAddress: string;
  onSave: (value: number) => void;
  onClear: () => void;
}

export const PropertiesFilterDropdown = (props: IPropertiesFilterDropdownProps) => {
  const {
    items,
    searchPlaceholder,
    value: initialValue,
    collectionAddress,
    onSave,
    onClear,
  } = props;

  const [value, setValue] = useState<number>();
  const [isOpened, setIsOpened] = useState(false);

  const handleSave = useCallback(() => {
    onSave(value || 0);
    setIsOpened(false);
  }, [value, onSave]);

  const handleClear = useCallback(() => {
    setValue(initialValue);
    onClear();
  }, [initialValue, onClear]);

  const valueLabel = useMemo(() => {
    if (!initialValue) {
      return null;
    }

    return `3D Glasses +2`;
  }, [initialValue]);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Dropdown
      label={'Properties'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={PropertiesIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(initialValue);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        padding={'30px 30px 0 30px'}
        onSave={handleSave}
        onClear={handleClear}
      >
        <PropertiesFilter
          collectionAddress={collectionAddress}
          items={items}
          searchPlaceholder={searchPlaceholder}
          value={value ?? 0}
          onChange={(value) => setValue(value)}
        />
      </DropdownFilterContainer>
    </Dropdown>
  );
}
