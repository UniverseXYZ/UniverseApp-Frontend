import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { FormikProps } from 'formik';

import { useMarketplaceSellData } from '../../../../../hooks';
import { SellMethod } from '../../../../../enums';
import * as styles from '../../styles';
import { CurrencyInput, DateTimePicker, InfoTooltip } from '../../../../../../../../../components';
import { IEnglishAuctionForm, IMarketplaceSellContextData } from '../../../../../types';

interface IMarketplaceSellContextDataOverride extends Omit<IMarketplaceSellContextData, 'form'> {
  form: FormikProps<IEnglishAuctionForm>;
}

export const SettingsTabEnglishAuction = () => {
  const { form, sellMethod } = useMarketplaceSellData() as IMarketplaceSellContextDataOverride;

  if (sellMethod !== SellMethod.ENGLISH) {
    return null;
  }

  return (
    <>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>
            Minimum bid
            <InfoTooltip
              label="If you don’t receive any bids equal or greater than your reserve,
              the auction will end without a sale. An item can be listed for a reserve price and any bid greater than or
              equal to reserve price will trigger a 24 hour auction. We require a minimum reserve price of 1 ETH
              or the quivalent value in your selected token."
            />
          </Heading>
          <Text>Set your starting bid price.</Text>
        </Box>
        <Box>
          <CurrencyInput
            placeholder={'Minimum bid'}
            name={'minimumBid'}
            value={form.values.minBit}
            onChange={(value) => form.setFieldValue('minBit', value)}
          />
        </Box>
      </Flex>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>
            Reserve price
            <InfoTooltip
              label="If you don’t receive any bids equal or greater than your reserve,
              the auction will end without a sale. An item can be listed for a reserve price and any bid greater than or
              equal to reserve price will trigger a 24 hour auction. We require a minimum reserve price of 1 ETH
              or the quivalent value in your selected token."
            />
          </Heading>
          <Text>Set a reserve price for your NFT</Text>
        </Box>
        <Box>
          <CurrencyInput
            placeholder={'Reserve price'}
            name={'reservePrice'}
            value={form.values.reservePrice}
            onChange={(value) => form.setFieldValue('reservePrice', value)}
          />
        </Box>
      </Flex>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Expiration date</Heading>
          <Text>
            Your auction will automatically end at this time and the highest bidder will win.
            No need to cancel it.
          </Text>
        </Box>
        <Box>
          <DateTimePicker
            value={form.values.expirationDate}
            modalName={'Expiration date'}
            onChange={(val) => form.setFieldValue('expirationDate', val)}
          />
        </Box>
      </Flex>
    </>
  );
};
