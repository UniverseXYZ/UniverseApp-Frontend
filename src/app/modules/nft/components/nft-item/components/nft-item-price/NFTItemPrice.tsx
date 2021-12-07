import { Image, Text } from '@chakra-ui/react';
import React from 'react';

import ethereumIcon from '../../../../../../../assets/images/marketplace/eth-icon.svg';

interface INFTItemPriceProps {
  price: number | string;
}

export const NFTItemPrice = ({ price }: INFTItemPriceProps) => (
  <Text>
    {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
    <Image
      src={ethereumIcon}
      alt={'Ethereum icon'}
      display={'inline'}
      mx={'4px'}
      position={'relative'}
      top={'-2px'}
      width={'9px'}
    />
    {price}
  </Text>
);
