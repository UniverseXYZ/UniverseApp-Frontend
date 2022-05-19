import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTProperty } from '..';
import { PolymorphPropertyTrait } from '..';
import { PolymorphProperty } from '..';
import { INFTProperty } from '../../../../../../types';
import { EventsEmpty } from '../shared';

interface ITabPropertiesProps {
  properties: INFTProperty[];
}

export const TabProperties = ({ properties = [] }: ITabPropertiesProps) => {
  const { isPolymorph, collectionAddress } = useNFTPageData();

  const polymorphProperties = useMemo(() => {
    if (!isPolymorph) {
      return [];
    }

    return properties.filter((property) => ['Rank', 'Rarity score'].includes(property.traitType));
  }, [isPolymorph, properties]);

  if (!properties?.length) {
    return <EventsEmpty title="This NFT doesn't have any properties." />;
  }

  return (
    <Box>
      {isPolymorph && (
        <Flex mb={'18px'}>
          {polymorphProperties.map((property, i: number) => (
            <PolymorphProperty key={i} property={property} />
          ))}
        </Flex>
      )}
      <SimpleGrid columns={2} spacing={'20px'}>
        {properties.map((property, i: number) =>
          isPolymorph ? (
            !polymorphProperties.includes(property) ? (
              <PolymorphPropertyTrait
                key={i}
                property={property}
                collectionAddress={collectionAddress}
              />
            ) : null
          ) : (
            !!property.traitType && !!property.value && (
              <NFTProperty
                key={i}
                property={property}
                collectionAddress={collectionAddress}
              />)
          )
        )}
      </SimpleGrid>
    </Box>
  );
};
