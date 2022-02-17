import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FormikProps } from 'formik';

import { useMarketplaceSellData } from '../../../../hooks';
import { SellAmountType, SellMethod } from '../../../../enums';
import * as styles from '../../styles';
import { CurrencyInput, DateTimePicker, InputShadow } from '../../../../../../../../components';
import { IFixedListingForm, IMarketplaceSellContextData } from '../../../../types';
import { BundleForm } from '../../../bundle-form';

interface IMarketplaceSellContextDataOverride extends Omit<IMarketplaceSellContextData, 'form'> {
  form: FormikProps<IFixedListingForm>;
}

export const SettingsTabFixedListing = () => {
  const { form, sellMethod, amountType } = useMarketplaceSellData() as IMarketplaceSellContextDataOverride;

  if (sellMethod !== SellMethod.FIXED) {
    return null;
  }

  return (
    <>
      { amountType === SellAmountType.BUNDLE && (<BundleForm />) }
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Price*</Heading>
          <Text>Will be on sale until you transfer this item or cancel it.</Text>
        </Box>
        <Box>
          <FormControl isInvalid={!!(form.touched.price && form.errors.price)}>
            <CurrencyInput
              placeholder={'Amount'}
              name={'price'}
              value={form.values.price}
              currencyValue={form.values.priceCurrency}
              onChange={(value) => form.setFieldValue('price', value)}
              onChangeCurrency={(value) => form.setFieldValue('priceCurrency', value)}
              onBlur={form.handleBlur}
            />
            <FormErrorMessage>{form.errors.price}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>
      <Flex sx={styles.settingsItem} flexDir={'column'}>
        <Box>
          <Heading as={'h5'}>Duration</Heading>
          <Text>Your listing will be active during the time period you set.</Text>
        </Box>
        <Flex mt={'20px'} w={'100% !important'}>
          <SimpleGrid columns={2} spacingX={'20px'}>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <DateTimePicker
                value={form.values.startDate}
                modalName={'Start date'}
                onChange={(val) => form.setFieldValue('startDate', val)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End date</FormLabel>
              <DateTimePicker
                value={form.values.endDate}
                modalName={'End date'}
                onChange={(val) => form.setFieldValue('endDate', val)}
              />
            </FormControl>
          </SimpleGrid>
        </Flex>
      </Flex>
      <Flex data-checkbox sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Privacy</Heading>
          <Text>You can keep your listing public, or you can specify one address that’s allowed to buy it.</Text>
        </Box>
        <Flex justifyContent={'flex-end'}>
          <Switch
            size="lg"
            name="isPrivacy"
            isChecked={form.values.isPrivacy}
            onChange={form.handleChange}
          />
        </Flex>
        {form.values.isPrivacy && (
          <Box pt={'20px'} w={'100%'}>
            <InputShadow>
              <Input
                placeholder="Buyer address"
                name="buyerAddress"
                value={form.values.buyerAddress}
                onChange={form.handleChange}
              />
            </InputShadow>
          </Box>
        )}
      </Flex>
    </>
  );
};
