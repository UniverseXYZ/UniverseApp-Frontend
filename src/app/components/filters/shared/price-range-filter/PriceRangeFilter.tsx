import {
  Box,
  FormLabel,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CurrencySelect } from '@app/components';
import { IFilter, IFilterComponentsProps } from '@app/components/filters';

export interface IPriceRangeFilterValue {
  currency: any | null; // TODO
  price: number[];
}

export const usePriceRangeFilter = (): IFilter<IPriceRangeFilterValue> => {
  const form = useFormik<IPriceRangeFilterValue>({
    initialValues: {
      currency: null,
      price: [0, 0],
    },
    onSubmit: () => void 0,
  });

  const getValueLabel = useCallback((value: IPriceRangeFilterValue) => {
    if (!form.dirty) {
      return null;
    }

    const minPrice = value.price[0];
    const maxPrice = value.price[1];

    if (maxPrice && minPrice) {
      return `${minPrice}-${maxPrice} ${value.currency?.token || 'All'}`;
    }

    if (maxPrice) {
      return `<${maxPrice} ${value.currency?.token || 'All'}`
    }

    if (minPrice) {
      return `>${minPrice} ${value.currency?.token || 'All'}`
    }

    return null;
  }, [form.dirty]);

  return {
    name: 'Price Range',
    icon: 'filterPriceRange',
    form,
    getValueLabel,
  };
};

export const PriceRangeFilter: React.FC<IFilterComponentsProps<IPriceRangeFilterValue>> = (props) => {
  const { value, onChange } = props;

  const [isMaxPriceFocused, setIsMaxPriceFocused] = useState<boolean>(false);
  const [minPriceVal, setMinPriceVal] = useState<string>('');
  const [maxPriceVal, setMaxPriceVal] = useState<string>('');

  const handleChangeCurrency = useCallback((newCurrency) => {
    onChange({...value, currency: newCurrency})
  }, [value, onChange]);

  const handleChangePrice = useCallback((newPrice: number[]) => {
    onChange({...value, price: newPrice})
  }, [value, onChange]);

  useEffect(() => {
    setMinPriceVal(`${value.price?.[0]}`);
    setMaxPriceVal(`${value.price?.[1]}`);
  }, [value.price]);

  return (
    <>
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
            value={maxPriceVal}
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
    </>
  );
};
