import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

import { PolymorphProperties, Properties } from '../../../../mocks';
import { NFTProperty } from '..';
import { useNFTPageData } from '../../../../NFTPage.context';
import { PolymorphPropertyTrait } from '..';
import { PolymorphProperty } from '..';
// import { PropertyTraitVariant } from '../polymorph-property-trait/enums';

export const TabProperties = ({ properties } : { properties?: any }) => {
  const { isPolymorph } = useNFTPageData();

  const polymorphProperties = useMemo(() => {
    if (!isPolymorph) {
      return [];
    }

    return properties.filter((property: any) => ['Rank', 'Rarity score'].includes(property.name))
  }, [isPolymorph, properties]);

  return (
    <Box>
      {isPolymorph && (
        <Flex mb={'18px'}>
          {polymorphProperties.map((property: any, i: number) => <PolymorphProperty key={i} {...property} />)}
        </Flex>
      )}
      <SimpleGrid columns={2} spacing={'20px'}>
        {properties.map((property: any, i: number) => (
          isPolymorph
            ? !polymorphProperties.includes(property)
              ? <PolymorphPropertyTrait key={i} {...property} />
              : null
            : <NFTProperty key={i} entity={property} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
