import { Box, Flex, Heading, Input, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import { FormikProps } from 'formik';

import { useMarketplaceSellData } from '../../../../../hooks';
import { SellMethod } from '../../../../../enums';
import * as styles from '../../styles';
import { CurrencyInput, DateTimePicker, InputShadow } from '../../../../../../../../../components';
import { GreyBox } from '../../../../grey-box';
import { IMarketplaceSellContextData, IDutchAuctionForm } from '../../../../../types';

interface IMarketplaceSellContextDataOverride extends Omit<IMarketplaceSellContextData, 'form'> {
  form: FormikProps<IDutchAuctionForm>;
}

export const SettingsTabDutchAuction = () => {
  const { form, sellMethod } = useMarketplaceSellData() as IMarketplaceSellContextDataOverride;

  if (sellMethod !== SellMethod.DUTCH) {
    return null;
  }

  return (
    <>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Price</Heading>
          <Text>Set an initial price</Text>
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
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Include ending price</Heading>
          <Text>
            Adding an ending price will allow this listing to expire,
            or for the price to be reduced untill a buyer is found.
          </Text>
        </Box>
        <Flex justifyContent={'flex-end'} />
        <Box pt={'20px'} w={'100%'}>
          <GreyBox p={{ base: '20px', md: '30px' }}>
            <Flex sx={styles.settingsItem}>
              <Box>
                <Heading as={'h5'}>Ending price</Heading>
                <Text>
                  Must be less than or equal to the starting price.
                  The price will progress linearly to this amount until the expiration date.
                </Text>
              </Box>
              <Box>
                <CurrencyInput
                  placeholder={'Amount'}
                  name={'endingPrice'}
                  value={form.values.endingPrice}
                  onChange={(value) => form.setFieldValue('endingPrice', value)}
                />
              </Box>
            </Flex>
            <Flex sx={styles.settingsItem}>
              <Box>
                <Heading as={'h5'}>Expiration date</Heading>
                <Text>Your listing will automatically end at this time. No need to cancel it!</Text>
              </Box>
              <Box>
                <DateTimePicker
                  value={form.values.expirationDate}
                  modalName={'Expiration date'}
                  onChange={(val) => form.setFieldValue('expirationDate', val)}
                />
              </Box>
            </Flex>
          </GreyBox>
        </Box>
      </Flex>
      <Flex data-checkbox sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Schedule for a future time</Heading>
          <Text>You can schedle this listing to only be buyable at a future date.</Text>
        </Box>
        <Flex justifyContent={'flex-end'}>
          <Switch
            size="lg"
            name="isScheduledForFutureTime"
            isChecked={form.values.isScheduledForFutureTime}
            onChange={form.handleChange}
          />
        </Flex>
        {form.values.isScheduledForFutureTime && (
          <Box pt={'20px'} w={'100%'}>
            <GreyBox p={'30px'}>
              <Flex sx={styles.settingsItem}>
                <Box>
                  <Heading as={'h5'}>Future date</Heading>
                  <Text>Schedule for a future time.</Text>
                </Box>
                <Box>
                  <DateTimePicker
                    value={form.values.futureDate}
                    modalName={'Future date'}
                    onChange={(val) => form.setFieldValue('futureDate', val)}
                  />
                </Box>
              </Flex>
            </GreyBox>
          </Box>
        )}
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
