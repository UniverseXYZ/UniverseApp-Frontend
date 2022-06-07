import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useFormik } from 'formik';

import { Checkbox } from '@app/components';
import { IFilter, IFilterComponentsProps } from '@app/components/filters';

import { Options } from './constants';

export interface ISaleTypeFilterValue {
  buyNow: boolean;
  onAuction: boolean;
  new: boolean;
  hasOffers: boolean;
}

export const useSaleTypeFilter = (): IFilter<ISaleTypeFilterValue> => {
  const form = useFormik<ISaleTypeFilterValue>({
    initialValues: {
      buyNow: false,
      onAuction: false,
      new: false,
      hasOffers: false,
    },
    onSubmit: () => void 0,
  });

  const getValueLabel = useCallback((value: ISaleTypeFilterValue) => {
    const selectedOptions = Options.reduce<number[]>((acc, option, i) => {
      if (value[option.key]) {
        acc.push(i);
      }
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${Options[selectedOptions[0]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, []);

  return {
    name: 'Sale Type',
    icon: 'filterSaleType',
    form,
    getValueLabel,
  };
};

export const SaleTypeFilter: React.FC<IFilterComponentsProps<ISaleTypeFilterValue>> = (props) => {
  const { value, onChange } = props;

  const handleChangeOption = useCallback((optionName: keyof ISaleTypeFilterValue, optionValue: boolean) => {
    onChange({ ...value, [optionName]: optionValue });
  }, [value, onChange]);

  return (
    <SimpleGrid columns={2} spacingY={'20px'}>
      {Options.map(({ key, label, description }) => (
        <Box key={key}>
          <Checkbox size={'lg'} isChecked={value[key]} onChange={(e) => handleChangeOption(key, e.target.checked)}>
            {label}
            <Text as={'span'} sx={{
              color: '#00000066',
              display: 'block',
              fontSize: '12px',
              fontWeight: 400,
            }}>{description}</Text>
          </Checkbox>
        </Box>
      ))}
    </SimpleGrid>
  );
};
