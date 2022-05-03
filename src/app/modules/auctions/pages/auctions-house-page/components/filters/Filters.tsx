import { BoxProps, Flex, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useState } from 'react';

import SearchIcon from '@assets/images/search-gray.svg';
import { Select } from '@app/components';
import { useDebounce } from 'react-use';

interface IFiltersProps extends BoxProps {
  sortByItems: Array<unknown>;
}

export const Filters = (props: IFiltersProps) => {
  const { sortByItems, ...boxProps } = props;

  const [searchVal, setSearchVal] = useState('');

  useDebounce(() => {
    console.log('debounce', searchVal);
  }, 1000, [searchVal]);

  return (
    <Flex {...boxProps}>
      <InputGroup mr={'14px'}>
        <InputLeftElement pointerEvents="none">
          <Image src={SearchIcon} />
        </InputLeftElement>
        <Input
          type={'text'}
          placeholder={'Search by name or artist'}
          value={searchVal}
          onChange={({ currentTarget }) => setSearchVal(currentTarget.value)}
        />
      </InputGroup>
      <Select
        items={sortByItems}
        value={sortByItems[0]}
        buttonProps={{
          size: 'lg',
          fontSize: '16px',
          minWidth: '280px',
        }}
      />
    </Flex>
  );
}
