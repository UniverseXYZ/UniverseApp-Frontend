import { Box } from '@chakra-ui/react';
import React from 'react';

import { BoxSelect } from '../../box-select';
import { sellMethodOptions } from '../../../constants';
import { useMarketplaceSellData } from '../../../hooks';

export const SelectMethodType = () => {
  const sellData = useMarketplaceSellData();

  return (
    <Box mb={'120px'}>
      <BoxSelect options={sellMethodOptions} onSelect={sellData.selectMethod} />
    </Box>
  )
};
