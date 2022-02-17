import { Box, Flex, Heading, Input, Switch, Text } from '@chakra-ui/react';
import React from 'react';

import { useMarketplaceSellData } from '../../../../../hooks';
import { SellMethod } from '../../../../../enums';
import * as styles from '../../styles';
import { CurrencyInput, InputShadow } from '../../../../../../../../../components';

export const SettingsTabFixedListing = () => {
  const sellData = useMarketplaceSellData();

  if (sellData.form.values.sellMethod !== SellMethod.FIXED) {
    return null;
  }

  return (
    <>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Price</Heading>
          <Text>Will be on sale until you transfer this item or cancel it.</Text>
        </Box>
        <Box>
          <CurrencyInput
            placeholder={'Amount'}
            name={'price'}
            value={sellData.form.values.price}
            onChange={(value) => sellData.form.setFieldValue('price', value)}
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
            name="withPrivacy"
            onChange={sellData.form.handleChange}
            value={sellData.form.values.withPrivacy}
          />
        </Flex>
        {sellData.form.values.withPrivacy && (
          <Box pt={'20px'} w={'100%'}>
            <InputShadow>
              <Input
                placeholder="Buyer address"
                name="buyerAddress"
                value={sellData.form.values.buyerAddress}
                onChange={sellData.form.handleChange}
              />
            </InputShadow>
          </Box>
        )}
      </Flex>
    </>
  );
};
