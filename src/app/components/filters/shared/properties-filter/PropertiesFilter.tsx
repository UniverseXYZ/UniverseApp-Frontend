import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Checkbox, Icon, SearchInput } from '@app/components';
import { IFilter } from '@app/components/filters';

import * as styles from './PropertiesFilter.styles';

export interface IPropertiesFilterValue {
  properties: Record<string, string[]>;
}

export const usePropertiesFilter = (): IFilter<IPropertiesFilterValue> => {
  const form = useFormik<IPropertiesFilterValue>({
    initialValues: {
      properties: {}
    },
    onSubmit: () => void 0,
  });

  const getValueLabel = useCallback((value: IPropertiesFilterValue) => {
    if (!value) {
      return null;
    }

    const [first, ...rest] = Object.keys(value.properties).map((key) => value.properties[key]).flat();

    if (!first) {
      return null;
    }

    return `${first}${rest.length ? ` +${rest.length}` : ''}`;
  }, []);

  return {
    name: 'Properties',
    icon: 'filterProperties',
    form,
    getValueLabel,
  };
};

interface IPropertiesFilterProps {
  collectionAddress: string;
  searchPlaceholder?: string;
  value: IPropertiesFilterValue;
  onChange: (value: IPropertiesFilterValue) => void;
}

export const PropertiesFilter = (props: IPropertiesFilterProps) => {
  const {
    collectionAddress,
    searchPlaceholder = 'Search',
    value,
    onChange
  } = props;

  const [searchValue, setSearchValue] = useState<string>('');

  const { data } = useQuery<Array<{ trait_type: string; value: string[]; }>>(['properties', collectionAddress], async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DATASCRAPER_BACKEND}/v1/tokens/${collectionAddress}/token-attributes`);
    return data;
  });

  const handleSearch = useCallback((searchValue: any) => {
    setSearchValue(searchValue.target.value);
  }, []);

  const handleToggleItem = useCallback((traitType, traitTypeValue) => {
    if (value.properties.hasOwnProperty(traitType) && (value.properties[traitType] || []).includes(traitTypeValue)) {
      onChange({
        properties: {
          ...value.properties,
          [traitType]: value.properties[traitType].filter((_value: string) => _value !== traitTypeValue)
        }
      });
    } else {
      onChange({
        properties: data?.reduce<Record<string, string[]>>((acc, group) => {
          if (value.properties.hasOwnProperty(group.trait_type) || group.trait_type === traitType) {
            acc[group.trait_type] = group.value.filter(
              (_value) => (value.properties[group.trait_type] || []).includes(_value) || _value === traitTypeValue
            );
          }
          return acc;
        }, {}) ?? {}
      });
    }
  }, [data, value, onChange]);

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return data;
    }

    return !data
      ? []
      : data.map((group) => ({
        ...group,
        value: group.value.filter(prop => prop?.toLowerCase().includes(searchValue))
      })).filter(group => group.value.length);
  }, [data, searchValue]);

  const isChecked = useCallback((traitType, traitTypeValue) => {
    return value.properties.hasOwnProperty(traitType) && (value.properties[traitType] || []).includes(traitTypeValue);
  }, [value]);

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
          onChange={handleSearch}
        />
      </Box>
      <Box {...styles.WrapperStyle}>
        <Accordion allowToggle allowMultiple>
          {filteredItems?.map((group, i) => (
            <AccordionItem key={i} {...styles.AccordionItemStyle}>
              <h2>
                <AccordionButton {...styles.AccordionButtonStyle}>
                  <Box flex='1' textAlign='left' fontSize={'16px'} fontWeight={600}>
                    {group.trait_type}
                    <Box {...styles.GroupItemsAmountLabelStyle}>{group.value.length}</Box>
                  </Box>
                  <Icon name={'down'} />
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                {group.value.map((value, j) => (
                  <Box key={j} py={'6px'} _first={{ pt: 0 }} _last={{ pb: '20px' }}>
                    <Checkbox
                      size={'lg'}
                      isChecked={isChecked(group.trait_type, value)}
                      onChange={() => handleToggleItem(group.trait_type, value)}
                    >{value}</Checkbox>
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
