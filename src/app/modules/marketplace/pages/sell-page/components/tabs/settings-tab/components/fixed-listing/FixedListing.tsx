import { Box, Flex, Heading, Input, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import { FormikProps } from 'formik';

import { useMarketplaceSellData } from '../../../../../hooks';
import { SellAmountType, SellMethod } from '../../../../../enums';
import * as styles from '../../styles';
import { CurrencyInput, InputShadow } from '../../../../../../../../../components';
import { IFixedListingForm, IMarketplaceSellContextData } from '../../../../../types';
import { BundleForm } from '../../../../bundle-form';

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
          <Heading as={'h5'}>Price</Heading>
          <Text>Will be on sale until you transfer this item or cancel it.</Text>
        </Box>
        <Box>
          <CurrencyInput
            placeholder={'Amount'}
            name={'price'}
            value={form.values.price}
            onChange={(value) => form.setFieldValue('price', value)}
          />
        </Box>
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
