import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  NumberInputProps,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';

import ArrowIcon from '../../../assets/images/arrow-down.svg';

import { TOKENS, TOKENS_MAP } from '../../constants';
import { Tokens } from '../../enums';
import * as styles from './styles';

interface ICurrencyInputProps extends Omit<NumberInputProps, 'onChange'> {
  currencyValue: string;
  onChange: (value: string) => void;
  onChangeCurrency: (value: string) => void;
}

export const CurrencyInput = (
  {
    value,
    currencyValue,
    onChange,
    onChangeCurrency,
    placeholder,
    ...props
  }: ICurrencyInputProps
) => {
  const handleChangeInput = useCallback((vStr, vNum) => {
    onChange(vStr);
  }, [onChange]);

  return (
    <Box position={'relative'}>
      <Menu>
        <MenuButton as={Button} size={'sm'} {...styles.ButtonStyle}>
          <Image src={TOKENS_MAP[currencyValue as Tokens].icons[0]} mr={'10px'} h={'20px'} w={'20px'} />
          {TOKENS_MAP[currencyValue as Tokens].ticker}
          <Image src={ArrowIcon} />
        </MenuButton>
        <MenuList {...styles.OptionsContainerStyle}>
          {TOKENS.map((TOKEN) => (
            <MenuItem
              key={TOKEN.ticker}
              {...styles.OptionStyle}
              onClick={() => onChangeCurrency(TOKEN.ticker)}
            >
              <Image src={TOKEN.icons[0]} h={'20px'} w={'20px'} />
              {TOKEN.ticker}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <NumberInput
        value={value}
        {...props}
        onChange={handleChangeInput}
      >
        <NumberInputField
          placeholder={placeholder}
          paddingRight={'105px !important'}
        />
      </NumberInput>
    </Box>
  );
};
