import {
  BoxProps,
  Image,
  ImageProps,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import React from 'react';

import { InputShadow } from '../input-shadow';

import searchIcon from '../../../assets/images/search-gray.svg';

interface ISearchInputProps {
  inputGroupProps?: InputGroupProps;
  iconProps?: ImageProps;
  inputProps?: InputProps;
  shadowProps?: BoxProps;
}

export const SearchInput = (props: ISearchInputProps) => (
  <InputGroup {...props.inputGroupProps}>
    <InputShadow {...props.shadowProps}>
      <InputLeftElement pointerEvents="none">
        <Image src={searchIcon} {...props.iconProps} />
      </InputLeftElement>
      <Input
        pl={'50px'}
        {...props.inputProps}
        placeholder={props.inputProps?.placeholder ?? 'Search'}
      />
    </InputShadow>
  </InputGroup>
);
