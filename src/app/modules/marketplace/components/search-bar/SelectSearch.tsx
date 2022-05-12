import { Box, Image, Text, Flex } from '@chakra-ui/react';
import React, { useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useClickAway } from 'react-use';

import GoToCollectionIcon from '@assets/images/go-to-collection.svg';
import { Loading, InfoTooltip } from '@app/components';
import { getCollectionBackgroundColor } from '@legacy/helpers';

import { SearchInput } from './SearchInput';
import { ISearchBarDropdownCollection } from '../../../collection/types';
import * as styles from './SelectSearch.styles';

interface ISearchSelectProps {
  items: ISearchBarDropdownCollection[];
  isFetchingCollections: boolean;
  label?: string;
  icon?: string;
  searchPlaceholder?: string;
  search?: string;
  onChange: (value: ISearchBarDropdownCollection) => void;
  onClear: () => void;
  onSearch: (value: string) => void;
}

export const SearchSelect = (props: ISearchSelectProps) => {
  const {
    items,
    isFetchingCollections,
    searchPlaceholder,
    search,
    onChange,
    onClear,
    onSearch,
  } = props;

  const ref = useRef<HTMLHeadingElement>(null);

  const router = useRouter();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  useClickAway(ref, () => setIsOpened(false));

  const handleItemSelect = useCallback((e: React.MouseEvent<HTMLElement>, item) => {
    e.stopPropagation();

    onChange(item);

    setIsOpened(false);
  }, [onChange]);

  const handleSearch = useCallback((searchedValue: any) => {
    const { value } = searchedValue.target;

    onSearch(value);
  }, [onSearch]);

  const handleClearClick = useCallback(() => {
    onClear();
  }, [onClear]);

  const handleGoToCollection = useCallback((address: string) => {
    router.push(`/collection/${address}`);
  }, []);

  return (
    <Box ref={ref} pos={'relative'} onClick={() => setIsOpened(true)}>
      <Box>
        <SearchInput
          shadowProps={{
            display: 'contents',
          }}
          inputGroupProps={{
            sx: {
              background: 'white',
              borderRadius: '12px',
              boxShadow: isOpened ? '0px 0px 0px 5px rgba(102, 234, 90, 0.15)' : '',

              '.chakra-input__left-element': {
                height: '60px',
                width: '60px',
              },
              '.chakra-input__right-element': {
                height: '60px',
                width: '60px',
              },
            }
          }}
          inputProps={{
            height: '60px',
            pl: '60px',
            placeholder: searchPlaceholder,
          }}
          value={search}
          onChange={handleSearch}
          onClear={handleClearClick}
        />
      </Box>

      {isOpened && (
        <Box
          {...styles.ItemsContainerStyle}
          display={(isFetchingCollections || !items.length) ? 'flex' : 'block'}
        >
          {isFetchingCollections && (
            <Loading />
          )}

          {!isFetchingCollections && items.length > 0 && (
            <Text textAlign={'left'} p={'20px 10px 10px 10px'} color={'rgba(0, 0, 0, 0.4)'} fontWeight={'bold'}>
              Collections
            </Text>
          )}

          {!isFetchingCollections && !items.length && (
            <Text>No Collections Found</Text>
          )}

          {!isFetchingCollections && items.map((item, i) => (
            <Box key={item.address} {...styles.ItemStyle} >

              <Flex w={'100%'}>
                <Box flex='1' onClick={(e) => handleItemSelect(e, item)} textAlign={'initial'}>
                  {item?.image?.length && (
                    <Image src={item.image || ''} {...styles.ItemImageStyle} />
                  )}

                  {!item.image && (
                    <Box
                      sx={{
                        alignItems: 'center',
                        bg: getCollectionBackgroundColor({ address: item.address }),
                        borderRadius: '50%',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        h: '30px',
                        w: '30px',
                        mr: '12px'
                      }}
                    >{(item.name || item.address)?.charAt(0)}</Box>
                  )}

                  {item.name || item.address}
                </Box>

                <Box>
                  <InfoTooltip
                    icon={GoToCollectionIcon}
                    label="Go to collection"
                    onClick={() => handleGoToCollection(item?.address)}
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};


