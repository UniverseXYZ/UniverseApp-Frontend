import { Image, Input, InputGroup, InputLeftElement, Stack, StackProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

import SearchIcon from '@assets/images/search-gray.svg';
import { Select } from '@app/components';

interface IFiltersProps extends StackProps {
  sortByItems: Array<unknown>;
}

export const Filters = (props: IFiltersProps) => {
  const { sortByItems, ...stackProps } = props;

  const [searchVal, setSearchVal] = useState('');

  useDebounce(() => {
    console.log('debounce', searchVal);
  }, 1000, [searchVal]);

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={'14px'} {...stackProps}>
      <InputGroup>
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
        label={'Sort By'}
        buttonProps={{
          size: 'lg',
          fontSize: '16px',
          minWidth: '280px',
        }}
      />
    </Stack>
  );
}
