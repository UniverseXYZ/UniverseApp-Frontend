import { Box, Image, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import ethereumIcon from '../../../../../../../assets/images/marketplace/eth-icon.svg';

interface INFTItemPriceInfoProps {
  offerPrice: string | number;
  lastPrice: string | number;
}

export const NFTItemPriceInfo = ({ offerPrice, lastPrice }: INFTItemPriceInfoProps) => {
  const [label, value] = useMemo(() => {
    if (offerPrice) {
      return ['Offer for', offerPrice];
    }

    if (lastPrice) {
      return ['Last', lastPrice];
    }

    return [null, null];
  }, [offerPrice, lastPrice]);

  return !label ? null : (
    <Text>
      {label}
      <Image
        src={ethereumIcon}
        alt={'Ethereum icon'}
        display={'inline'}
        mx={'4px'}
        position={'relative'}
        top={'-1px'}
        width={'6px'}
      />
      <Box as={'span'} color={'black'}>{value}</Box>
    </Text>
  );
};
