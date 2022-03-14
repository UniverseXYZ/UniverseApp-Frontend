import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CollectionsIcon from '../../../../../../../../assets/images/v2/marketplace/filter-collections.svg';
import CloseIcon from '../../../../../../../../assets/images/close-menu.svg';

import { Checkbox, Dropdown, DropdownFilterContainer, SearchInput } from '../../../../../../../components';
import * as styles from './styles';
import { ICollectionFilterValue } from './types';
import { CollectionImagePlaceholder } from './components';

interface ICollectionsFilterProps {
  items?: ICollectionFilterValue[];
  searchPlaceholder?: string;
  value: ICollectionFilterValue[];
  onChange: (value: ICollectionFilterValue[]) => void;
}

export const CollectionsFilter = (props: ICollectionsFilterProps) => {
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
    onChange([item]);
  }, [value, onChange]);

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return [...items].filter(collection => collection.name.toLowerCase().includes(searchValue));
  }, [items, searchValue]);

  return (
    <>
      <Box px={{ base: 0, md: '30px' }} pt={{ base: 0, md: '30px' }} pb={'18px'}>
        <Flex flexWrap={'wrap'}>
          {items.map((item, i) => !value.includes(item) ? null : (
            <Box key={i} {...styles.SelectedItemStyle}>
              {item.image ? (
                <Image
                  src={item.image}
                  {...styles.SelectedItemImageStyle}
                  borderRadius={'5px'}
                />
              ) : (
                <CollectionImagePlaceholder
                  collection={item}
                  fontFamily={'"Space Grotesk"'}
                  fontSize={'14px'}
                  mr={'8px'}
                  h={'20px'}
                  w={'20px'}
                />
              )}
              {item.name}
              <Image
                src={CloseIcon}
                {...styles.SelectedItemRemoveStyle}
                onClick={() => onChange([])}
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
        px: { base: 0, md: '30px' },
      }}>
        {filteredItems.map((item, i) => (
          <Box key={i} {...styles.ItemStyle} onClick={() => handleToggleItem(item)}>
            {value.includes(item)
              ? (
                <Checkbox
                  isChecked={true}
                  size={'lg'}
                  {...styles.ItemCheckboxStyle}
                  borderRadius={'5px'}
                />
              )
              : item.image
                ? (<Image src={item.image} {...styles.ItemImageStyle} borderRadius={'5px'} />)
                : (<CollectionImagePlaceholder collection={item} mr={'12px'} />)
            }
            {item.name}
          </Box>
        ))}
      </Box>
    </>
  );
};

interface ICollectionsFilterDropdownProps {
  items?: ICollectionFilterValue[];
  searchPlaceholder?: string;
  value: ICollectionFilterValue[];
  onSave: (value: ICollectionFilterValue[]) => void;
  onClear: () => void;
}

export const CollectionsFilterDropdown = (props: ICollectionsFilterDropdownProps) => {
  const {
    items,
    searchPlaceholder,
    value: initialValue,
    onSave,
    onClear,
  } = props;

  const [value, setValue] = useState<ICollectionFilterValue[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  const handleSave = useCallback(() => {
    onSave(value);
    setIsOpened(false);
  }, [value, onSave]);

  const handleClear = useCallback(() => {
    setValue(initialValue);
    onClear();
  }, [initialValue, onClear]);

  const valueLabel = useMemo(() => {
    if (!initialValue.length) {
      return null;
    }

    return `${initialValue[0].name}${initialValue.length > 1 ? `+${initialValue.length - 1}` : ''}`;
  }, [initialValue]);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Dropdown
      label={'Collections'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={CollectionsIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(initialValue);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        padding={0}
        onSave={handleSave}
        onClear={handleClear}
      >
        <CollectionsFilter
          items={items}
          searchPlaceholder={searchPlaceholder}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </DropdownFilterContainer>
    </Dropdown>
  );
};
