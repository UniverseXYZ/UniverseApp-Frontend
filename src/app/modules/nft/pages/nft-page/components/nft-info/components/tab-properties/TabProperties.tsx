import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTProperty } from '..';
import { PolymorphPropertyTrait } from '..';
import { PolymorphProperty } from '..';
import popup from '../../../../../../../../../assets/images/popup.png';
import './TabProperties.scss';

export const TabProperties = ({ properties = [] } : { properties: Array<Record<string, string>> }) => {
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
