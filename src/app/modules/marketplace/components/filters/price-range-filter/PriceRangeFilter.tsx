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
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { Dropdown, DropdownFilterContainer, CurrencySelect } from '../../../../../components';

import priceRangeIcon from '../../../../../../assets/images/marketplace/price-range.svg';

interface IPriceRangeFilterForm {
  currency: string; // TODO
  price: [number, number];
}

interface IPriceRangeFilterProps {
  onChange: (values: IPriceRangeFilterForm) => void;
}

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;

export const PriceRangeFilter = ({ onChange }: IPriceRangeFilterProps) => {
  const [isMaxPriceFocused, setIsMaxPriceFocused] = useState<boolean>(false);
  const [minPriceVal, setMinPriceVal] = useState<string>(DEFAULT_MIN_VALUE.toString());
  const [maxPriceVal, setMaxPriceVal] = useState<string>(DEFAULT_MAX_VALUE.toString());

  const form = useFormik<IPriceRangeFilterForm>({
    initialValues: {
      currency: '',
      price: [DEFAULT_MIN_VALUE, DEFAULT_MAX_VALUE],
    },
    onSubmit: (values) => {
      onChange(values);
    },
  });

  useEffect(() => {
    setMinPriceVal(`${form.values.price[0]}`);
    setMaxPriceVal(`${form.values.price[1]}`);
  }, [form.values.price])

  return (
    <Dropdown
      label={'Price range'}
      buttonProps={{ leftIcon: <Image src={priceRangeIcon} /> }}
    >
      <DropdownFilterContainer
        onSave={() => form.submitForm()}
        onClear={() => form.resetForm()}
      >
        <Box mb={'30px'}>
          <CurrencySelect />
        </Box>

        <RangeSlider
          aria-label={['min', 'max']}
          name={'price'}
          value={form.values.price}
          onChange={(value) => form.setFieldValue('price', value)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>

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
                form.setFieldValue('price', [val, form.values.price[1]]);
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
              value={!isMaxPriceFocused && form.values.price[1] === 100 ? `100+` : maxPriceVal}
              onChange={(val) => setMaxPriceVal(val)}
              onFocus={() => setIsMaxPriceFocused(true)}
              onBlur={() => {
                const val = +(maxPriceVal || 0);
                setMaxPriceVal(`${val}`);
                form.setFieldValue('price', [form.values.price[0], val]);
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
