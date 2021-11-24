import { Box, Button, Flex, Heading, Input, Switch, Text } from '@chakra-ui/react';
import React from 'react';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import { CurrencyInput, InputShadow } from '../../../../../../../components';

const styles = {
  mainContainer: {
    fontFamily: 'Space Grotesk',
    mb: '40px',
    padding: '40px 50px',
    h5: {
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
      width: {
        base: '100%',
        md: '70%'
      },
      marginBottom: {
        base: '10px',
        md: 0
      },
    },
    '> div:nth-of-type(2)': {
      width: {
        base: '100%',
        md: '30%'
      },
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

export const SettingsTab = () => {
  const sellData = useMarketplaceSellData();

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
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
                  onChange={sellData.form.handleChange}
                  value={sellData.form.values.buyerAddress}
                />
              </InputShadow>
            </Box>
          )}
        </Flex>
      </GreyBox>
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
      </Box>
    </>
  );
}
