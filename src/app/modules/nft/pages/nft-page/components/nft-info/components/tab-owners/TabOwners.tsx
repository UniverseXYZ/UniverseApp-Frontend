import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { useNftCheckoutStore } from '../../../../../../../../../stores/nftCheckoutStore';
import { Owners } from '../../../../mocks';
import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTTabItemWrapper } from '..';
import { sortOwners } from './helpers';
import * as s from './TabOwners.styles';

export const TabOwners: React.FC = () => {

  const { NFT } = useNFTPageData();

  const { checkoutNFT } = useNftCheckoutStore();

  const [owners] = useState(sortOwners([...Owners]));

  const handleBuy = useCallback(() => {
    // checkoutNFT(); // TODO
    console.log('handleBuy');
  }, []);

  return (
    <Box>
      {owners.map((owner, i) => (
        <NFTTabItemWrapper key={i} label={i === 0 && owner.price ? 'Lowest ask' : undefined}>
          <Flex>
            <Image src={owner.user.photo} {...s.ImageStyle} />
            <Box>
              <Text {...s.NameStyle}>{owner.user.name}</Text>
              <Text {...s.DescriptionStyle}>
                {owner.edition}/{NFT.tokenIds.length}
                {!owner.price
                  ? (<> editions<Box {...s.PriceStyles}> not for sale</Box></>)
                  : (<> on sale for <Box {...s.PriceStyles}> {owner.price.toString()} ETH</Box> each</>)
                }
              </Text>
            </Box>
          </Flex>
          {owner.price && (<Button boxShadow={'lg'} onClick={() => handleBuy()}>Buy</Button>)}
        </NFTTabItemWrapper>
      ))}
    </Box>
  );
}
