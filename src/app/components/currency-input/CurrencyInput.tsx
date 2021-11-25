import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, NumberInput, NumberInputField, NumberInputProps,
} from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';

import { InputShadow } from '../input-shadow';
import ether from '../../../assets/images/coins/eth.svg';
import bond from '../../../assets/images/coins/bond.svg';
import dai from '../../../assets/images/coins/dai.svg';
import snx from '../../../assets/images/coins/snx.svg';
import usdc from '../../../assets/images/coins/usdc.svg';
import arrow from '../../../assets/images/arrow-down.svg';

interface ICurrencyInputProps extends NumberInputProps {
  value: any;
  onChange: (value: any) => void;
}

const coins = [
  { name: 'ETH', icon: ether, },
  { name: 'USDC', icon: usdc, },
  { name: 'BOND', icon: bond, },
  { name: 'SNX', icon: snx, },
  { name: 'DAI', icon: dai, },
];

export const CurrencyInput = ({ value, onChange, placeholder, ...props }: ICurrencyInputProps) => {
  const selectedCoin = useMemo(() => {
    return coins.find((coin) => coin.name === value.currency) || coins[0];
  }, [value.currency]);

  const handleSelectCoin = useCallback((coin) => {
    if (onChange) {
      onChange({ ...value, currency: coin.name });
    }
  }, [value, onChange]);

  const handleChangeInput = useCallback((valueStr) => {
    if (onChange) {
      onChange({ ...value, value: valueStr });
    }
  }, [value, onChange]);

  return (
    <Box position={'relative'}>
      <Menu>
        <MenuButton
          as={Button}
          size={'sm'}
          sx={{
            background: 'rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '6px',
            padding: '7px 10px',
            position: 'absolute',
            right: '5px',
            top: '4px',
            zIndex: 2,
            '> span': {
              display: 'contents',
            },
            _hover: {
              background: 'rgba(0, 0, 0, 0.03)',
              boxShadow: 'sm',
            },
            _focus: {
              background: 'rgba(0, 0, 0, 0.03)',
              boxShadow: 'sm',
            },
            _active: {
              boxShadow: 0,
            }
          }}
        >
          <Image src={selectedCoin.icon} mr={'10px'} />
          {selectedCoin.name}
          <Image src={arrow} ml={'10px'} />
        </MenuButton>
        <MenuList minWidth={'100px'} p={'8px'} position={'relative'} zIndex={3}>
          {coins.map((coin, i) => (
            <MenuItem
              key={i}
              borderRadius={'5px'}
              fontFamily={'Space Grotesk'}
              fontWeight={500}
              sx={{
                padding: '10px',
                paddingRight: '20px',
                _hover: {
                  bg: 'rgba(0, 0, 0, 0.05)',
                },
                _focus: {
                  bg: 'rgba(0, 0, 0, 0.05)',
                }
              }}
              onClick={() => handleSelectCoin(coin)}
            >
              <Image src={coin.icon} mr={'10px'} />
              {coin.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <NumberInput
        value={value.value}
        {...props}
        onChange={handleChangeInput}
      >
        <InputShadow>
          <NumberInputField
            placeholder={placeholder}
            paddingRight={'105px !important'}
          />
        </InputShadow>
      </NumberInput>
    </Box>
  );
};
