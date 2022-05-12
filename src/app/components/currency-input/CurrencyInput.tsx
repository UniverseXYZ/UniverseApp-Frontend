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
import { constants } from 'ethers';
import React, { useCallback } from 'react';

import ArrowIcon from '../../../assets/images/arrow-down.svg';

import { TOKENS, TOKENS_MAP } from '../../constants';
import { TokenTicker } from '../../enums';
import * as styles from './styles';
import { useMeasure } from 'react-use';

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
  const [ref, { width }] = useMeasure<HTMLButtonElement>();

  const handleChangeInput = useCallback((vStr, vNum) => {
    onChange(vStr);
  }, [onChange]);

  // 20 (paddings) + 2 (border) + 16 (margins)
  const inputPaddingRight = width + 20 + 2 + 16;

  return (
    <Box position={'relative'}>
      <Menu>
        <MenuButton ref={ref} as={Button} size={'sm'} {...styles.ButtonStyle}>
          <Image src={TOKENS_MAP[currencyValue as TokenTicker].icons[0]} mr={'10px'} h={'20px'} w={'20px'} />
          {TOKENS_MAP[currencyValue as TokenTicker].ticker}
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
        max={Number(constants.MaxInt256)}
      >
        <NumberInputField
          placeholder={placeholder}
          paddingRight={`${inputPaddingRight}px !important`}
        />
      </NumberInput>
    </Box>
  );
};
