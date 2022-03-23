import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';

import CollectionsIcon from '../../../../assets/images/v2/marketplace/filter-collections.svg';
import CloseIcon from '../../../../assets/images/close-menu.svg';

import { Checkbox, Dropdown, DropdownFilterContainer, SearchInput } from '../../../components';
import * as styles from './styles';
import { CollectionImagePlaceholder } from './components';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';
import { ICollectionsValue } from './types';

interface ICollectionFilterValue {
  collections: ICollectionsValue[];
}

export const useCollectionsFilter = () => {
  const form = useFormik<ICollectionFilterValue>({
    initialValues: {
      collections: []
    },
    onSubmit: () => {},
  });

  return { form };
};

interface ICollectionsFilterProps {
  items?: ICollectionsValue[];
  searchPlaceholder?: string;
  value: ICollectionFilterValue;
  onChange: (value: ICollectionFilterValue) => void;
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
    onChange({ collections: [item] });
  }, [value, onChange]);

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return [...items].filter(collection => collection.name.toLowerCase().includes(searchValue));
  }, [items, searchValue]);

  return (
    <>
      <Box p={0} pb={'18px'}>
        <Flex flexWrap={'wrap'}>
          {items.map((item, i) => !value.collections.includes(item) ? null : (
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
              {item.name || shortenEthereumAddress(item.address || '')}
              <Image
                src={CloseIcon}
                {...styles.SelectedItemRemoveStyle}
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
          <Box key={i} {...styles.ItemStyle} onClick={() => handleToggleItem(item)}>
            {value.collections.includes(item)
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
            {item.name || shortenEthereumAddress(item.address || '')}
          </Box>
        ))}
      </Box>
    </>
  );
};

interface ICollectionsFilterDropdownProps {
  items?: ICollectionsValue[];
  searchPlaceholder?: string;
  value: ICollectionFilterValue;
  onSave: (value: ICollectionFilterValue) => void;
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

  const [value, setValue] = useState<ICollectionFilterValue>({ collections: [] });
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
    if (!initialValue.collections.length) {
      return null;
    }

    return `${initialValue.collections[0].name}${initialValue.collections.length > 1 ? `+${initialValue.collections.length - 1}` : ''}`;
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
        padding={'30px 30px 0 30px'}
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
