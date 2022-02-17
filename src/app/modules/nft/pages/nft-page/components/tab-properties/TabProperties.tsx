import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

import { PolymorphProperties, Properties } from '../../mocks';
import { NFTProperty } from '../nft-property';
import { useNFTPageData } from '../../NFTPage.context';
import { PolymorphPropertyTrait } from '../polymorph-property-trait';
import { PolymorphProperty } from '../polymorph-property';
import { PropertyTraitVariant } from '../polymorph-property-trait/enums';

export const TabProperties = () => {
  const { isPolymorph } = useNFTPageData();

  const [properties] = useState(isPolymorph ? PolymorphProperties : Properties);

  const polymorphProperties = useMemo(() => {
    if (!isPolymorph) {
      return [];
    }

    return properties.filter((property) => ['Rank', 'Rarity score'].includes(property.name))
  }, [isPolymorph, properties]);

  return (
    <Box>
      {isPolymorph && (
        <Flex mb={'18px'}>
          {polymorphProperties.map((property, i) => <PolymorphProperty key={i} {...property} />)}
        </Flex>
      )}
      <SimpleGrid columns={2} spacing={'20px'}>
        {properties.map((property, i) => (
          isPolymorph
            ? !polymorphProperties.includes(property)
              ? <PolymorphPropertyTrait key={i} {...property} />
              : null
            : <NFTProperty key={i} {...property} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
