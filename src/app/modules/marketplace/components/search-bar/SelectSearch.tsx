import { Box, BoxProps, CheckboxProps, Image, ImageProps, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState, useRef } from 'react';

import { SearchInput } from './SearchInput';
import { ISearchBarValue } from './types';
import { ISearchBarDropdownCollection } from '../../../nft/types';
import { Loading } from '../../../../components';
import { getCollectionBackgroundColor } from '../../../../../utils/helpers';

const MIN_CHARS_LENGTH = 3;
interface IStyles {
  selectedItemsContainer: BoxProps;
  selectedItem: BoxProps;
  selectedItemImage: (isRoundedImage: boolean) => ImageProps;
  selectedItemRemove: ImageProps;
  itemsContainer: (isFetchingCollections: boolean, itemsCount: number) => BoxProps;
  item: BoxProps;
  itemImage: (isRoundedImage: boolean) => ImageProps;
  itemCheckbox: (isRoundedImage: boolean) => CheckboxProps;
}

const styles: IStyles = {
  selectedItemsContainer: {
    flexWrap: 'wrap',
  },
  selectedItem: {
    alignItems: 'center',
    bg: 'linear-gradient(135deg, rgba(188, 235, 0, 0.1) 15.57%, rgba(0, 234, 234, 0.1) 84.88%), #FFFFFF',
    border: '1px solid #BCEB00',
    borderRadius: '8px',
    display: 'flex',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    p: '5px 11px 5px 6px',
    maxH: '32px',
    mb: '8px',
    mr: '8px',
    _last: {
      mb: '20px',
    }
  },
  selectedItemImage: (isRoundedImage) => ({
    borderRadius: isRoundedImage ? '50%' : '5px',
    display: 'inline-block',
    height: '20px',
    marginRight: '8px',
    width: '20px',
  }),
  selectedItemRemove: {
    cursor: 'pointer',
    height: '10px',
    marginLeft: '8px',
    width: '10px',
  },
  itemsContainer: (isFetchingCollections, itemsCount) => ({
    maxH: '215px',
    minH: '215px',
    mt: '5px',
    overflowY: 'scroll',
    px: '5px',
    background: 'white',
    borderRadius: '12px',
    display: (isFetchingCollections || !itemsCount) ? 'flex' : 'block',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    w: '100%',
    zIndex: '100'
  }) ,
  item: {
    alignItems: 'center',
    borderRadius: '10px',
    display: 'flex',
    fontSize: '14px',
    fontWeight: 500,
    padding: '10px',
    _hover: {
      bg: 'rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
    },
    _last: {
      mb: '10px',
    }
  },
  itemImage: (isRoundedImage) => ({
    borderRadius: isRoundedImage ? '50%' : '5px',
    display: 'inline-block',
    height: '30px',
    marginRight: '12px',
    width: '30px',
  }),
  itemCheckbox: (isRoundedImage) => ({
    mr: '12px',
    sx: {
      '.chakra-checkbox__control': {
        borderRadius: isRoundedImage ? '50%' : '5px',
        height: '30px',
        width: '30px',
      }
    }
  }),
};
interface ISearchSelectProps {
  items: ISearchBarDropdownCollection[];
  isFetchingCollections: boolean;
  label?: string;
  icon?: string;
  searchPlaceholder?: string;
  onItemSelect: (value: string) => void;
  onChange: (value: ISearchBarValue) => void;
  onClear: () => void;
}

export const SearchSelect = (props: ISearchSelectProps) => {
  const {
    items,
    isFetchingCollections,
    searchPlaceholder,
    onChange,
    onItemSelect,
    onClear,
  } = props;

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [value, setValue] = useState<ISearchBarValue>({ searchValue: ''});
  const [filteredItems, setFilteredItems] = useState<ISearchBarDropdownCollection[]>(items);
  const ref = useRef<HTMLHeadingElement>(null);

  const handleItemSelect = useCallback((item) => {
    const result: ISearchBarValue = {
      searchValue: item.name,
    };

    setValue(result);
    onItemSelect(item.address);

    // For some reason the component did not set the value properly
    setTimeout(() => setIsOpened(false) , 100);
  }, [onChange]);

  const onSearch = (searchedValue: any) => {
    const result: ISearchBarValue = {
      searchValue: searchedValue.target.value
    };
    setValue(result);

    if (result.searchValue.length > MIN_CHARS_LENGTH) {
      onChange(result);
    }
  };

  const getRandomInt = useCallback((max) => {
    return Math.floor(Math.random() * max);
  }, []);

  const handleClearClick = () => {
    const result: ISearchBarValue = {
      searchValue: ''
    };

    setValue(result);
    onClear();
  }

  useEffect(() => {
    // Upon new items, update the filtered ones
    if (items) {
      setFilteredItems(items);
    }
  }, [items])

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Box
      onClick={() => setIsOpened(true)}
      ref={ref}
      pos={'relative'}
    >
      <Box>
        <SearchInput
          shadowProps={{
            display: 'contents',
          }}
          inputGroupProps={{
            sx: {
              '.chakra-input__left-element': {
                height: '60px',
                width: '60px',
              },
              '.chakra-input__right-element': {
                height: '60px',
                width: '60px',
              },
              background: 'white',
              borderRadius: '12px',
              boxShadow: isOpened ? '0px 0px 0px 5px rgba(102, 234, 90, 0.15)' : '',
            }
          }}
          inputProps={{
            height: '60px',
            pl: '60px',
            placeholder: searchPlaceholder,
          }}
          value={value.searchValue}
          onChange={onSearch}
          onClear={handleClearClick}
        />
      </Box>

      {isOpened && (
        <Box {...styles.itemsContainer(isFetchingCollections, filteredItems.length)}>
          {isFetchingCollections && (
            <Loading />
          )}

          {!isFetchingCollections && filteredItems.length > 0 && (
            <Text textAlign={'left'} p={'20px 10px 10px 10px'} color={'rgba(0, 0, 0, 0.4)'} fontWeight={'bold'}>
              Collections
            </Text>
          )}

          {!isFetchingCollections && !filteredItems.length && (
            <Text>
              No Collections Found
            </Text>
          )}

          {!isFetchingCollections && filteredItems.map((item, i) => (
            <Box key={item.address} {...styles.item} onClick={() => handleItemSelect(item)}>

            {item?.image?.length && (
              <Image
                src={item.image || ''}
                {...styles.itemImage(true)}
                borderRadius={'50%'}
              />
            )}

            {!item.image && (
              <Box
                sx={{
                  alignItems: 'center',
                  bg: getCollectionBackgroundColor({
                    id: getRandomInt(10000),
                    address: item.address,
                  }),
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  h: '30px',
                  w: '30px',
                  mr: '20px'
                }}
              >{item?.name.charAt(0)}</Box>
            )}

              {item.name}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
