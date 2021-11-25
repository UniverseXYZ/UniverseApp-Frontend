import { Box, Button, Flex, Heading, Input, Switch, Text } from '@chakra-ui/react';
import React from 'react';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import { CurrencyInput, DateTimePicker, InputShadow } from '../../../../../../../components';
import { SellMethod } from '../../../enums';

const styles = {
  mainContainer: {
    fontFamily: 'Space Grotesk',
    mb: '40px',
    padding: '40px 50px',
    h5: {
      fontFamily: 'Space Grotesk',
      fontSize: '16px',
      mb: '10px',
    },
    p: {
      color: '#00000066',
      fontSize: '14px',
    },
  },
  settingsItem: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    mt: '30px',
    pb: '30px',
    flexWrap: 'wrap',
    position: 'relative',
    '> div:nth-of-type(1)': {
      marginBottom: {
        base: '10px',
        md: 0
      },
      paddingRight: {
        base: 0,
        md: '50px',
      },
      width: {
        base: '100%',
        md: '70%'
      },
    },
    '> div:nth-of-type(2)': {
      alignItems: 'center',
      display: 'flex',
      width: {
        base: '100%',
        md: '30%',
      },
      '> div': {
        width: '100%'
      }
    },
    '&[data-checkbox]': {
      '> div:nth-of-type(2)': {
        position: {
          base: 'absolute',
          md: 'static'
        },
        right: 0,
        top: '-5px',
      },
    },
    _first: {
      mt: 0,
    },
    _last: {
      borderBottom: 0,
      pb: 0,
      '> div:nth-of-type(1)': {
        marginBottom: 0,
      },
    },
  },
  checkBoxContainer: {
  },
};

const SettingsTabFixedListing = () => {
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


const SettingsTabDutchAuction = () => {
  const sellData = useMarketplaceSellData();

  if (sellData.form.values.sellMethod !== SellMethod.DUTCH) {
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
            value={sellData.form.values.price}
            onChange={(value) => sellData.form.setFieldValue('price', value)}
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
          <GreyBox p={'30px'}>
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
                  value={sellData.form.values.endingPrice}
                  onChange={(value) => sellData.form.setFieldValue('endingPrice', value)}
                />
              </Box>
            </Flex>
            <Flex sx={styles.settingsItem}>
              <Box>
                <Heading as={'h5'}>Expiration date</Heading>
                <Text>Your listing will automatically end at this time. No need to cancel it!</Text>
              </Box>
              <Box>
                {/*<InputShadow>*/}
                {/*  <Input*/}
                {/*    placeholder="Mar 14, 2021, 12:00 EST"*/}
                {/*    name="expirationDate"*/}
                {/*    value={sellData.form.values.expirationDate}*/}
                {/*    onChange={sellData.form.handleChange}*/}
                {/*  />*/}
                {/*</InputShadow>*/}
                <DateTimePicker />
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
            onChange={sellData.form.handleChange}
            value={sellData.form.values.isScheduledForFutureTime}
          />
        </Flex>
        {sellData.form.values.isScheduledForFutureTime && (
          <Box pt={'20px'} w={'100%'}>
            <GreyBox p={'30px'}>
              <Flex sx={styles.settingsItem}>
                <Box>
                  <Heading as={'h5'}>Future date</Heading>
                  <Text>Schedule for a future time.</Text>
                </Box>
                <Box>
                  <InputShadow>
                    <Input
                      placeholder="Mar 14, 2021, 12:00 EST"
                      name="futureDate"
                      value={sellData.form.values.futureDate}
                      onChange={sellData.form.handleChange}
                    />
                  </InputShadow>
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

export const SettingsTab = () => {
  const sellData = useMarketplaceSellData();

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
        <SettingsTabFixedListing />
        <SettingsTabDutchAuction />
      </GreyBox>
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
      </Box>
    </>
  );
}
