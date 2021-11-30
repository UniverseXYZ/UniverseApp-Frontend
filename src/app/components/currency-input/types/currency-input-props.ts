import { NumberInputProps } from '@chakra-ui/react';

import { ICurrencyInputValue } from './currency-input-value';

export interface ICurrencyInputProps extends Omit<NumberInputProps, 'value'> {
  value: ICurrencyInputValue;
  onChange: (value: any) => void;
}
