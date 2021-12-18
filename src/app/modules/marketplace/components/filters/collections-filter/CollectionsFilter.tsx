import { Box, BoxProps, CheckboxProps, Flex, Image, ImageProps } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { Checkbox, Dropdown, DropdownFilterContainer, SearchInput } from '../../../../../components';

import collectionsIcon from '../../../../../../assets/images/marketplace/collections.svg';
import closeIcon from '../../../../../../assets/images/close-menu.svg';

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

interface ICollectionsFilterProps {
  items: any[];
  isRoundedImage?: boolean;
  onChange: (values: IFormValues) => void;
  onClear: () => void;
}

export const CollectionsFilter = (
  {
    items,
    isRoundedImage = false,
    onChange,
    onClear
  }: ICollectionsFilterProps
) => {
  const [selected, setSelected] = useState<any>({});

  const handleToggleItem = useCallback((item, isSelected) => {
    setSelected({...selected, [item.id]: isSelected})
  }, [selected]);

  const handleSave = useCallback(() => {
    onChange([]);
  }, [onChange]);

  return (
    <Dropdown
      label={'Collections'}
      buttonProps={{ leftIcon: <Image src={collectionsIcon} /> }}
    >
      <DropdownFilterContainer
        padding={0}
        onSave={handleSave}
        onClear={onClear}
      >
        <Box px={'30px'} pt={'30px'} pb={'18px'}>
          <Flex {...styles.selectedItemsContainer}>
            {items.map((item, i) => !selected[item.id] ? null : (
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
                  onClick={() => handleToggleItem(item, false)}
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
              placeholder: 'Search in collections',
            }}
          />
        </Box>
        <Box {...styles.itemsContainer}>
          {items.map((item, i) => (
            <Box
              key={i}
              {...styles.item}
              onClick={() => handleToggleItem(item, !selected[item.id])}
            >
              {selected[item.id]
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
      </DropdownFilterContainer>
    </Dropdown>
  );
}
