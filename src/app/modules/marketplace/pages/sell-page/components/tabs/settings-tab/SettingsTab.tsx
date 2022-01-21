import {
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import * as styles from './styles';
import { SelectNFTs, SettingsTabDutchAuction, SettingsTabEnglishAuction, SettingsTabFixedListing } from './components';
import { SellAmountType } from '../../../enums';

export const SettingsTab = () => {
  const { form, ...sellData } = useMarketplaceSellData();

  useEffect(() => {
    form.validateForm();
  }, []);

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
        <SettingsTabFixedListing />
        <SettingsTabDutchAuction />
        <SettingsTabEnglishAuction />
      </GreyBox>

      {sellData.amountType === SellAmountType.BUNDLE && !!sellData.sellMethod
        ? (<SelectNFTs />)
        : (
          <Box textAlign={'right'} mb={'50px'}>
            <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
            <Button boxShadow={'xl'} disabled={!form.isValid} onClick={sellData.goContinue}>Continue</Button>
          </Box>
        )
      }
    </>
  );
}
