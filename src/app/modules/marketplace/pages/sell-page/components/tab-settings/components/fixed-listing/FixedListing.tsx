import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { default as dayjs } from 'dayjs';
import { default as isSameOrAfter } from 'dayjs/plugin/isSameOrAfter';
import { NFTStandard } from '@app/modules/nft/types';

import { useMarketplaceSellData } from '../../../../hooks';
import { SellAmountType, SellMethod } from '../../../../enums';
import * as styles from '../../styles';
import { AmountSelector, CurrencyInput, DateTimePicker } from '../../../../../../../../components';
import { IFixedListingForm, IMarketplaceSellContextData } from '../../../../types';
import { BundleForm } from '../../../bundle-form';

dayjs.extend(isSameOrAfter);

interface IMarketplaceSellContextDataOverride extends Omit<IMarketplaceSellContextData, 'form'> {
  form: FormikProps<IFixedListingForm>;
}

export const SettingsTabFixedListing = () => {
  const [minEndDate, setMinEndDate] = useState(dayjs().add(1, 'hour').toDate());
  const { form, sellMethod, amountType, nft } = useMarketplaceSellData() as IMarketplaceSellContextDataOverride;

  const {
    values: { startDate, endDate },
  } = form;

  useEffect(() => {
    // set the end date + 1 day and set the minimum end date
    const _endDate = dayjs(startDate || dayjs())
      .add(1, 'hour')
      .toDate();
    setMinEndDate(_endDate);

    const isStartAfterEnd = dayjs(startDate).isSameOrAfter(dayjs(endDate));

    if (isStartAfterEnd) {
      // if the user sets the start date to be after the end date - set the end date + 1 day
      form.setFieldValue('endDate', _endDate);
    }
  }, [startDate, endDate]);

  if (sellMethod !== SellMethod.FIXED) {
    return null;
  }

  return (
    <>
      {amountType === SellAmountType.BUNDLE && <BundleForm />}
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
              onChange={(value) => {
                if (Number(value) > -1 && value.length < 21) {
                  return form.setFieldValue('price', value);
                }
              }}
              onChangeCurrency={(value) => form.setFieldValue('priceCurrency', value)}
              onBlur={form.handleBlur}
            />
            <FormErrorMessage>{form.errors.price}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>
      {nft.standard === NFTStandard.ERC1155 && (
        <Flex sx={styles.settingsItem}>
          <Box>
            <Heading as={'h5'}>Amount</Heading>
            <Text>The amount of editions you’d like to list.</Text>
          </Box>
          <Box>
            <AmountSelector
              options={{
                value: form.values.amount,
                step: 1,
                max: 10, // TODO: provide correct max value
                min: 1,
                onChange: (_, value) => form.setFieldValue('amount', value),
              }}
              ml={'auto'}
              w={['100%', null, 'fit-content !important']}
            />
          </Box>
        </Flex>
      )}
      <Flex sx={styles.settingsItem} flexDir={'column'}>
        <Box>
          <Heading as={'h5'}>Duration</Heading>
          <Text>Your listing will be active during the time period you set.</Text>
        </Box>
        <Flex mt={'20px'} w={'100% !important'}>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacingX={'20px'}>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <DateTimePicker
                value={form.values.startDate}
                modalName={'Start date'}
                minDate={dayjs().toDate()}
                onChange={(val) => form.setFieldValue('startDate', val)}
                validateListing
              />
            </FormControl>
            <FormControl>
              <FormLabel>End date</FormLabel>
              <DateTimePicker
                value={form.values.endDate}
                modalName={'End date'}
                minDate={minEndDate}
                onChange={(val) => form.setFieldValue('endDate', val)}
                validateListing
              />
            </FormControl>
          </SimpleGrid>
        </Flex>
      </Flex>
      {/* <Flex data-checkbox sx={styles.settingsItem}>
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
      </Flex> */}
    </>
  );
};
