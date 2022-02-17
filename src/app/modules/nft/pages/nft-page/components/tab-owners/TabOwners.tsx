import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Owners } from '../../mocks';
import { useNFTPageData } from '../../NFTPage.context';
import { NFTTabItemWrapper } from '../nft-tab-item-wrapper';
import * as styles from './styles';
import { sortOwners } from './helpers';

export const TabOwners = () => {
  const { NFT } = useNFTPageData();

  const [owners] = useState(sortOwners([...Owners]));

  return (
    <Box>
      {owners.map((owner, i) => (
        <NFTTabItemWrapper key={i} label={i === 0 && owner.price ? 'Lowest ask' : undefined}>
          <Flex>
            <Image src={owner.user.photo} {...styles.ImageStyle} />
            <Box>
              <Text {...styles.NameStyle}>{owner.user.name}</Text>
              <Text {...styles.DescriptionStyle}>
                {owner.edition}/{NFT.tokenIds.length}
                {!owner.price
                  ? (<> editions<Box {...styles.PriceStyles}> not for sale</Box></>)
                  : (<> on sale for <Box {...styles.PriceStyles}> {owner.price.toString()} ETH</Box> each</>)
                }
              </Text>
            </Box>
          </Flex>
          {owner.price && (<Button boxShadow={'lg'}>Buy</Button>)}
        </NFTTabItemWrapper>
      ))}
    </Box>
  );
}
