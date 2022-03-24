import { Box } from '@chakra-ui/react';
import React from 'react';

import { BoxSelect } from '../box-select';
import { sellAmountOptions } from '../../constants';
import { TieredAuctionsBanner } from '../tiered-auctions-banner';
import { useMarketplaceSellData } from '../../hooks';

export const SelectAmountTab = () => {
  const sellData = useMarketplaceSellData();

  return (
    <>
      <Box mb={'100px'}>
        <BoxSelect options={sellAmountOptions} onSelect={sellData.selectAmount} />
      </Box>
      <TieredAuctionsBanner />
    </>
  );
};
