import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useFormik } from 'formik';

import CloseIcon from '@assets/images/close-menu.svg';

import { Checkbox, SearchInput } from '@app/components';
import { IFilter, IFilterComponentsProps } from '@app/components/filters';
import { shortenEthereumAddress } from '@legacy/helpers/format';

import { CollectionImagePlaceholder } from './components';
import { ICollectionsFilterCollection } from './types';
import * as s from './CollectionsFilter.styles';

export interface ICollectionFilterValue {
  collections: ICollectionsFilterCollection[];
}

export const useCollectionsFilter = (): IFilter<ICollectionFilterValue> => {
  const form = useFormik<ICollectionFilterValue>({
    initialValues: {
      collections: []
    },
    onSubmit: () => void 0,
  });

  const getValueLabel = useCallback((value: ICollectionFilterValue) => {
    if (!value.collections.length) {
      return null;
    }

    return `${value.collections[0].name}${value.collections.length > 1 ? `+${value.collections.length - 1}` : ''}`;
  }, []);

  return {
    name: 'Collections',
    icon: 'filterCollection',
    form,
    getValueLabel,
  };
};

interface ICollectionsFilterProps extends IFilterComponentsProps<ICollectionFilterValue> {
  items?: ICollectionsFilterCollection[];
  searchPlaceholder?: string;
}

export const CollectionsFilter: React.FC<ICollectionsFilterProps> = (props) => {
  const {
    items = [],
    searchPlaceholder = 'Search collection',
    value,
    onChange
  } = props;

  const [searchValue, setSearchValue] = useState<string>('');

  const onSearch = useCallback((searchValue: any) => {
    setSearchValue(searchValue.target.value);
  }, []);

  const handleToggleItem = useCallback((item) => {
    onChange({ collections: [item] });
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
        <Flex flexWrap={'wrap'}>
          {items.map((item, i) => !value.collections.includes(item) ? null : (
            <Box key={i} {...s.SelectedItemStyle}>
              {item.image ? (
                <Image
                  src={item.image}
                  {...s.SelectedItemImageStyle}
                  borderRadius={'5px'}
                />
              ) : (
                <CollectionImagePlaceholder
                  name={item.name}
                  address={item.address}
                  {...s.SelectedCollectionCoverPlaceholder}
                />
              )}
              {item.name || shortenEthereumAddress(item.address || '')}
              <Image
                src={CloseIcon}
                {...s.SelectedItemRemoveStyle}
                onClick={() => onChange({ collections: [] })}
              />
            </Box>
          ))}
        </Flex>
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
      <Box sx={{
        maxH: { base: 'fit-content', md: '215px' },
        overflowY: 'scroll',
        px: 0,
      }}>
        {filteredItems.map((item, i) => (
          <Box key={i} {...s.ItemStyle} onClick={() => handleToggleItem(item)}>
            {value.collections.includes(item)
              ? (
                <Checkbox
                  isChecked={true}
                  size={'lg'}
                  {...s.ItemCheckboxStyle}
                  borderRadius={'5px'}
                />
              )
              : item.image
                ? (<Image src={item.image} {...s.ItemImageStyle} borderRadius={'5px'} />)
                : (<CollectionImagePlaceholder name={item.name} address={item.address} mr={'12px'} />)
            }
            {item.name || shortenEthereumAddress(item.address || '')}
          </Box>
        ))}
      </Box>
    </>
  );
};
