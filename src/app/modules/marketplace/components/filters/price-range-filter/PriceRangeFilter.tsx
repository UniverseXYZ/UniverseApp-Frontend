import {
  Box,
  FormLabel,
  Image,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown, DropdownFilterContainer, CurrencySelect } from '../../../../../components';
import { IPriceRangeFilterProps, IPriceRangeFilterValue } from './types';

import priceRangeIcon from '../../../../../../assets/images/marketplace/price-range.svg';

export const PriceRangeFilter = ({ value: _value, isDirty, onChange, onClear }: IPriceRangeFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState<IPriceRangeFilterValue>({} as IPriceRangeFilterValue);

  const [isMaxPriceFocused, setIsMaxPriceFocused] = useState<boolean>(false);
  const [minPriceVal, setMinPriceVal] = useState<string>('');
  const [maxPriceVal, setMaxPriceVal] = useState<string>('');

  const handleSave = useCallback(() => {
    onChange(value);
    setIsOpened(false);
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    setValue(_value);
    onClear();
  }, [_value, onClear]);

  const handleChangeCurrency = useCallback((newCurrency) => {
    setValue({...value, currency: newCurrency})
  }, [value]);

  const handleChangePrice = useCallback((newPrice: number[]) => {
    setValue({...value, price: newPrice})
  }, [value]);

  const valueLabel = useMemo(() => {
    if (!isDirty) {
      return null;
    }
    return `${_value.price[0]}-${_value.price[1]}${_value.price[1] === 100 ? '+' : ''} ${_value.currency.token}`;
  }, [_value, isDirty]);

  useEffect(() => setValue(_value), [_value]);

  useEffect(() => {
    setMinPriceVal(`${value.price?.[0]}`);
    setMaxPriceVal(`${value.price?.[1]}`);
  }, [value.price]);

  return (
    <Dropdown
      label={'Price range'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={priceRangeIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(_value);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer
        onSave={handleSave}
        onClear={handleClear}
      >
        <Box mb={'30px'}>
          <CurrencySelect
            value={value.currency}
            onChange={(currency) => handleChangeCurrency(currency)}
          />
        </Box>

        {/* <RangeSlider
          aria-label={['min', 'max']}
          name={'price'}
          value={value.price}
          onChange={(value) => handleChangePrice(value)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider> */}

        <SimpleGrid columns={2} spacing={'24px'} mt={'24px'}>
          <Box position={'relative'}>
            <NumberInput
              min={0}
              max={99}
              value={minPriceVal}
              onChange={(val) => setMinPriceVal(val)}
              onBlur={() => {
                const val = +(minPriceVal || 0);
                setMinPriceVal(`${val}`);
                handleChangePrice([val, value.price[1]]);
              }}
            >
              <NumberInputField
                id={'minPriceVal'}
                placeholder={'0'}
                pt={'24px'}
                height={'64px'}
                fontWeight={500}
                fontSize={'16px'}
              />
            </NumberInput>
            <FormLabel
              htmlFor={'minPriceVal'}
              sx={{
                color: 'rgba(0, 0, 0, 0.4)',
                fontSize: '12px',
                fontWeight: 400,
                position: 'absolute',
                left: '16px',
                top: '12px',
              }}
            >Min price</FormLabel>
          </Box>
          <Box position={'relative'}>
            <NumberInput
              min={1}
              max={100}
              value={!isMaxPriceFocused && value.price?.[1] === 100 ? `100+` : maxPriceVal}
              onChange={(val) => setMaxPriceVal(val)}
              onFocus={() => setIsMaxPriceFocused(true)}
              onBlur={() => {
                const val = +(maxPriceVal || 0);
                setMaxPriceVal(`${val}`);
                handleChangePrice([value.price[0], val]);
                setIsMaxPriceFocused(false);
              }}
            >
              <NumberInputField
                id={'maxPriceVal'}
                placeholder={'0'}
                pt={'24px'}
                height={'64px'}
                fontWeight={500}
                fontSize={'16px'}
              />
            </NumberInput>
            <FormLabel
              htmlFor={'maxPriceVal'}
              sx={{
                color: 'rgba(0, 0, 0, 0.4)',
                fontSize: '12px',
                fontWeight: 400,
                position: 'absolute',
                left: '16px',
                top: '12px',
              }}
            >Max price</FormLabel>
          </Box>
        </SimpleGrid>
      </DropdownFilterContainer>
    </Dropdown>
  );
};
