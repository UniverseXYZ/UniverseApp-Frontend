import { NumberInputProps } from '@chakra-ui/react';

import { ICurrencyInputValue } from './currency-input-value';

export interface ICurrencyInputProps extends Omit<NumberInputProps, 'value' | 'onChange'> {
  value: ICurrencyInputValue;
  onChange: (value: ICurrencyInputValue) => void;
}
