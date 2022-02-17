import { Box, Checkbox, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useFormik } from 'formik';

import saleTypeIcon from '../../../../../../assets/images/marketplace/sale-type.svg';
import { Dropdown, DropdownFilterContainer } from '../../../../../components';

interface IFormValues {
  buyNow: boolean;
  onAuction: boolean;
  new: boolean;
  hasOffers: boolean;
}

interface ISaleTypeFilterProps {
  onChange: (values: IFormValues) => void;
}

export const SaleTypeFilter = ({ onChange }: ISaleTypeFilterProps) => {
  const form = useFormik<IFormValues>({
    initialValues: {
      buyNow: false,
      onAuction: false,
      new: false,
      hasOffers: false,
    },
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <Dropdown
      label={'Sale type'}
      buttonProps={{ leftIcon: <Image src={saleTypeIcon} /> }}
    >
      <DropdownFilterContainer
        onSave={() => form.submitForm()}
        onClear={() => form.resetForm()}
      >
        <SimpleGrid columns={2} spacingY={'20px'}>
          <Box>
            <Checkbox size={'lg'} name={'buyNow'} isChecked={form.values.buyNow} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Buy now</Text>
              <Text color={'#00000066'} fontSize={'12px'} fontWeight={400}>Fixed price sale</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'onAuction'} isChecked={form.values.onAuction} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>On auction</Text>
              <Text color={'#00000066'} fontSize={'12px'} fontWeight={400}>You can place bids</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'new'} isChecked={form.values.new} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>New</Text>
              <Text color={'#00000066'} fontSize={'12px'} fontWeight={400}>Recently added</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'hasOffers'} isChecked={form.values.hasOffers} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Has offers</Text>
              <Text color={'#00000066'} fontSize={'12px'} fontWeight={400}>High in demand</Text>
            </Checkbox>
          </Box>
        </SimpleGrid>
      </DropdownFilterContainer>
    </Dropdown>
  );
};
