import { Box, BoxProps, CheckboxProps, Flex, Image, ImageProps } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { Checkbox } from '../checkbox';
import { Dropdown, DropdownFilterContainer } from '../dropdown';
import { SearchInput } from '../search-input';

import closeIcon from '../../../assets/images/close-menu.svg';

interface IStyles {
  selectedItemsContainer: BoxProps;
  selectedItem: BoxProps;
  selectedItemImage: (isRoundedImage: boolean) => ImageProps;
  selectedItemRemove: ImageProps;
  itemsContainer: BoxProps;
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
  itemsContainer: {
    maxH: '215px',
    overflowY: 'scroll',
    px: '30px',
  },
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

type IFormValues = any[];

interface ISearchSelectProps {
  items: any[];
  value: any[];
  label?: string;
  icon?: string;
  inline?: boolean;
  searchPlaceholder?: string;
  isRoundedImage?: boolean;
  onSave?: () => void;
  onChange: (values: IFormValues) => void;
  onClear?: () => void;
}

interface ISearchSelectWrapperProps extends ISearchSelectProps {
  children: React.ReactNode;
}

const SearchSelectWrapper = ((
  {
    inline = false,
    label,
    icon,
    onSave,
    onClear,
    children,
  }: ISearchSelectWrapperProps
) => {
  const handleSave = useCallback(() => {
    onSave && onSave();
  }, [onSave]);

  const handleClear = useCallback(() => {
    onClear && onClear();
  }, [onClear]);

  return inline ? <>{children}</> : (
    <Dropdown
      label={label}
      buttonProps={{ leftIcon: icon ? <Image src={icon} /> : undefined }}
    >
      <DropdownFilterContainer
        padding={0}
        onSave={handleSave}
        onClear={handleClear}
      >{children}</DropdownFilterContainer>
    </Dropdown>
  );
});

export const SearchSelect = (props: ISearchSelectProps) => {
  const {
    items,
    value: _value,
    inline = false,
    searchPlaceholder,
    isRoundedImage = false,
    onChange,
  } = props;

  const [value, setValue] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>(items);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleToggleItem = useCallback((item) => {
    setValue([item]);

    // TODO
    if (inline) {
      onChange([item]);
    }
  }, [value, inline, onChange]);

  const onSearch = (searchValue: any) => {
    setSearchValue(searchValue.target.value);
    const newItems = [...items].filter(collection => collection.name.toLowerCase().includes(searchValue.target.value.toLowerCase()));
    setFilteredItems(newItems);
  };

  useEffect(() => setValue(_value), [_value]);

  return (
    <SearchSelectWrapper {...props}>
      <Box px={'30px'} pt={'30px'} pb={'18px'}>
        <Flex {...styles.selectedItemsContainer}>
          {items.map((item, i) => !value.includes(item) ? null : (
            <Box key={i} {...styles.selectedItem}>
              <Image
                src={item.image}
                {...styles.selectedItemImage(isRoundedImage)}
                borderRadius={isRoundedImage ? '50%' : '5px'}
              />
              {item.name}
              <Image
                src={closeIcon}
                {...styles.selectedItemRemove}
                onClick={() => {
                  setValue([]);
                  onChange([]);
                }}
              />
            </Box>
          ))}
        </Flex>
        <SearchInput
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
      <Box {...styles.itemsContainer}>
        {filteredItems.map((item, i) => (
          <Box key={i} {...styles.item} onClick={() => handleToggleItem(item)}>
            {value.includes(item)
              ? (
                <Checkbox
                  isChecked={true}
                  size={'lg'}
                  {...styles.itemCheckbox(isRoundedImage)}
                  borderRadius={isRoundedImage ? '50%' : '5px'}
                />
              )
              : (
                <Image
                  src={item.image}
                  {...styles.itemImage(isRoundedImage)}
                  borderRadius={isRoundedImage ? '50%' : '5px'}
                />)
            }
            {item.name}
          </Box>
        ))}
      </Box>
    </SearchSelectWrapper>
  );
};
