import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import { Properties } from '../../mocks';
import { NFTProperty } from '../nft-property';

export const TabProperties = () => {
  return (
    <SimpleGrid columns={2} spacing={'20px'}>
      {Properties.map((property, i) => (
        <NFTProperty key={i} {...property} />
      ))}
    </SimpleGrid>
  );
};
