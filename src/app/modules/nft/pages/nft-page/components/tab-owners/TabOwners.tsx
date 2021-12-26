import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Owners } from '../../mocks';
import { useNFTPageData } from '../../NFTPage.context';
import { NFTTabItemWrapper } from '../nft-tab-item-wrapper';
import * as styles from './styles';

export const TabOwners = () => {
  const { NFT } = useNFTPageData();

  const [owners] = useState([...Owners].sort((a, b) => {
    return (a.price || Infinity) > (b.price || Infinity) ? 1 : -1;
  }));

  return (
    <Box>
      {owners.map((owner, i) => (
        <NFTTabItemWrapper key={i} label={i === 0 && owner.price ? 'Lowest ask' : undefined}>
          <Flex>
            <Image src={owner.user.photo} {...styles.OwnerImageStyles} />
            <Box>
              <Text {...styles.OwnerNameStyles}>{owner.user.name}</Text>
              <Text {...styles.DescriptionStyles}>
                {owner.edition}/{NFT.tokenIds.length}
                {!owner.price
                  ? (<> editions<Box as={'strong'} color={'black'}> not for sale</Box></>)
                  : (<> on sale for <Box as={'strong'} color={'black'}> {owner.price.toString()} ETH</Box> each</>)
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
