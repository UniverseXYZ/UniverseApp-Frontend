import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTProperty } from '..';
import { PolymorphPropertyTrait } from '..';
import { PolymorphProperty } from '..';
import popup from '../../../../../../../../../assets/images/popup.png';
import './TabProperties.scss';
import { INFTProperty } from '../../../../../../types';

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
          <div className='no-properties'>
              <img id="popup-img" src={popup} alt="This NFT doesn't have any properties" />
            <div className="error-text">
              <span>This NFT doesn&apos;t have any properties</span>
            </div>
        </div> : null
        }
    </Box>
  );
};
