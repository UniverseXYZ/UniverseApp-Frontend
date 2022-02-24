import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import TextBubbleImage from '../../../../../../../../../assets/images/text-bubble.png';

import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTProperty } from '..';
import { PolymorphPropertyTrait } from '..';
import { PolymorphProperty } from '..';
import { INFTProperty } from '../../../../../../types';
import './TabProperties.scss';

interface ITabPropertiesProps {
  properties: INFTProperty[];
}

export const TabProperties = ({ properties = [] } : ITabPropertiesProps) => {
  const { isPolymorph } = useNFTPageData();

  const polymorphProperties = useMemo(() => {
    if (!isPolymorph) {
      return [];
    }

    return properties.filter((property) => ['Rank', 'Rarity score'].includes(property.traitType))
  }, [isPolymorph, properties]);

  return (
    <Box>
      {isPolymorph && (
        <Flex mb={'18px'}>
          {polymorphProperties.map((property, i: number) => <PolymorphProperty key={i} property={property} />)}
        </Flex>
      )}
      <SimpleGrid columns={2} spacing={'20px'}>
        {properties.map((property, i: number) => (
          isPolymorph
            ? !polymorphProperties.includes(property)
              ? <PolymorphPropertyTrait key={i} property={property} />
              : null
            : <NFTProperty key={i} property={property} />
        ))}
      </SimpleGrid>
        {
          properties.length == 0 ? 
          <Flex align={'center'} color={'rgba(0, 0, 0, 0.4)'} flexDir={'column'}>
            <Image src={TextBubbleImage} mt={'20px'} mb={'30px'} h={'70px'} w={'100px'} />
            <Text fontSize={'18px'} fontWeight={500} mb={'6px'}>This NFT doesn&apos;t have any properties.</Text>
          </Flex>
 
        : null
        }
    </Box>
  );
};
