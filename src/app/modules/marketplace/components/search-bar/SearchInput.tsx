import {
  BoxProps,
  Image,
  ImageProps,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  InputProps,
} from '@chakra-ui/react';
import { DebounceInput } from 'react-debounce-input';

import searchIcon from '../../../../../assets/images/search-gray.svg';
import closeIcon from '../../../../../assets/images/close-menu.svg';

interface ISearchInputProps {
  inputGroupProps?: InputGroupProps;
  iconProps?: ImageProps;
  inputProps?: InputProps;
  shadowProps?: BoxProps;
  onChange: (value: any) => void;
  onClear: () => void;
  value?: string;
}

export const SearchInput = (props: ISearchInputProps) => (
  <InputGroup {...props.inputGroupProps}>
      <InputLeftElement pointerEvents="none" style={{
        position: 'initial'
      }}>
        <Image src={searchIcon} {...props.iconProps} />
      </InputLeftElement>
`      <DebounceInput
          debounceTimeout={300}
          className="search-bar-input"
          style={{
            width: '90%',
            borderRadius: '12px',
          }}
          placeholder={props.inputProps?.placeholder ?? 'Search'}
          onChange={(value) => props.onChange(value)}
          value={props.value}
        />`
      <InputRightElement
        style={{
          position: 'initial',
          cursor: 'pointer'
        }}
        onClick={() => {
          props.onClear();
        }}
      >
        <Image src={closeIcon} {...props.iconProps} opacity={'0.3'}/>
      </InputRightElement>
  </InputGroup>
);
