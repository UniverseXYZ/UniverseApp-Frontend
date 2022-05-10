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

import searchIcon from '@assets/images/search-gray.svg';
import closeIcon from '@assets/images/close-menu.svg';
import { timeout } from '@app/utils/debounceConfig';

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
    <InputLeftElement pointerEvents="none" pos={'initial'}>
      <Image src={searchIcon} {...props.iconProps} />
    </InputLeftElement>
`   <DebounceInput
      debounceTimeout={timeout}
      className="search-bar-input"
      style={{
        flex: 1,
        borderRadius: '12px',
      }}
      value={props.value}
      placeholder={props.inputProps?.placeholder ?? 'Search'}
      onChange={(value: any) => props.onChange(value)}
    />`
    <InputRightElement
      cursor={"pointer"}
      pos={"initial"}
      onClick={() => {
        props.onClear();
      }}
    >
      <Image src={closeIcon} {...props.iconProps} opacity={'0.3'}/>
    </InputRightElement>
  </InputGroup>
);
