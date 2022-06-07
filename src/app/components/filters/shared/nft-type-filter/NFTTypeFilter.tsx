import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useFormik } from 'formik';

import { Checkbox } from '@app/components';
import { IFilter, IFilterComponentsProps } from '@app/components/filters';

import { Options } from './constants';

export interface INftTypeFilterValue {
  singleItem: boolean;
  bundle: boolean;
  composition: boolean;
  stillImage: boolean;
  gif: boolean;
  audio: boolean;
  video: boolean;
}

export const useNFTTypeFilter = (): IFilter<INftTypeFilterValue> => {
  const form = useFormik<INftTypeFilterValue>({
    initialValues: {
      singleItem: false,
      bundle: false,
      composition: false,
      stillImage: false,
      gif: false,
      audio: false,
      video: false,
    },
    onSubmit: () => void 0,
  });

  const getValueLabel = useCallback((value: INftTypeFilterValue) => {
    const selectedOptions = Options.reduce<Array<[number, number]>>((acc, optionGroup, i) => {
      optionGroup.options.forEach((option, j) => {
        if (value[option.key]) {
          acc.push([i, j]);
        }
      })
      return acc;
    }, []);

    if (!selectedOptions.length) {
      return null;
    }

    return `${Options[selectedOptions[0][0]].options[selectedOptions[0][1]].label}${selectedOptions.length > 1 ? ` +${selectedOptions.length - 1}` : ''}`;
  }, []);

  return {
    name: 'NFT Type',
    icon: 'filterNftType',
    form,
    getValueLabel,
  };
};

export const NFTTypeFilter: React.FC<IFilterComponentsProps<INftTypeFilterValue>> = (props) => {
  const { value, onChange } = props;

  const handleChangeOption = useCallback((optionName: keyof INftTypeFilterValue, optionValue: boolean) => {
    onChange({ ...value, [optionName]: optionValue });
  }, [value]);

  return (
    <>
      {Options.map((optionsGroup, i) => (
        <Box key={i} sx={{
          mb: '40px',
          _last: {
            mb: 0,
          }
        }}>
          <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'} fontWeight={500} mb={'20px'}>{optionsGroup.name}</Text>
          <SimpleGrid columns={2} spacingY={'20px'}>
            {optionsGroup.options.map(({ key, label }) => (
              <Box key={key}>
                <Checkbox
                  size={'lg'}
                  isChecked={value[key]}
                  onChange={(e) => handleChangeOption(key, e.target.checked)}
                >{label}</Checkbox>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </>
  );
};
