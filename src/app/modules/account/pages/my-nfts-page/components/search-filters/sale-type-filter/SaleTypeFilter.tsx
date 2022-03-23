import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikProps, useFormik } from 'formik';

import SaleTypeIcon from '../../../../../../../../assets/images/v2/marketplace/filter-sale-type.svg';

import { Checkbox, Dropdown, DropdownFilterContainer } from '../../../../../../../components';
import { SaleTypeFilterOptions } from './constants';
import { ISaleTypeFilterProps, ISaleTypeFilterValue } from './types';

export const useSaleTypeFilter = () => {
  const form = useFormik<ISaleTypeFilterValue>({
    initialValues: {
      buyNow: false,
      onAuction: false,
      new: false,
      hasOffers: false,
    },
    onSubmit: () => {},
  }) as FormikProps<ISaleTypeFilterValue>;

  return { form };
};

export const SaleTypeFilter = (props: ISaleTypeFilterProps) => {
  const { value, onChange } = props;

  const handleChangeOption = useCallback((optionName: keyof ISaleTypeFilterValue, optionValue: boolean) => {
    onChange({ ...value, [optionName]: optionValue });
  }, [value, onChange]);

  return (
    <SimpleGrid columns={2} spacingY={'20px'}>
      {SaleTypeFilterOptions.map(({ key, label, description }) => (
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

export interface ISaleTypeFilterDropdownProps {
  value: ISaleTypeFilterValue;
  onSave: (value: ISaleTypeFilterValue) => void;
  onClear: () => void;
}

export const SaleTypeFilterDropdown = (props: ISaleTypeFilterDropdownProps) => {
  const {
    value: initialValue,
    onSave,
    onClear,
  } = props;

  const [value, setValue] = useState<ISaleTypeFilterValue>({} as ISaleTypeFilterValue);
  const [isOpened, setIsOpened] = useState(false);

  const handleSave = useCallback(() => {
    onSave(value);
    setIsOpened(false);
  }, [value, onSave]);

  const handleClear = useCallback(() => {
    setValue(initialValue);
    onClear();
  }, [initialValue, onClear]);

  const valueLabel = useMemo(() => {
    const selectedOptions = SaleTypeFilterOptions.reduce<number[]>((acc, option, i) => {
      if (initialValue[option.key]) {
        acc.push(i);
      }
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${SaleTypeFilterOptions[selectedOptions[0]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, [initialValue]);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Dropdown
      label={'Sale type'}
      value={valueLabel}
      buttonProps={{ leftIcon: <Image src={SaleTypeIcon} /> }}
      isOpened={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => {
        setValue(initialValue);
        setIsOpened(false);
      }}
    >
      <DropdownFilterContainer onSave={handleSave} onClear={handleClear}>
        <SaleTypeFilter value={value} onChange={(value) => setValue(value)} />
      </DropdownFilterContainer>
    </Dropdown>
  );
}
