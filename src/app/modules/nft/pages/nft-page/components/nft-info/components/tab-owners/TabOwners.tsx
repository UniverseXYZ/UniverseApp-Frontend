import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { formatAddress, getStrGradient } from '@app/helpers';
import { IOrder, IOrderAssetTypeERC20, IOrderAssetTypeSingleListing } from '@app/modules/nft/types';

import { useNftCheckoutStore } from '../../../../../../../../../stores/nftCheckoutStore';
import { useNFTPageData } from '../../../../NFTPage.context';
import { NFTTabItemWrapper } from '..';
import { sortOwners } from './helpers';
import * as s from './TabOwners.styles';

export const TabOwners: React.FC = () => {

  const { NFT, collection, totalEditions, owners } = useNFTPageData();

  const { checkoutNFT } = useNftCheckoutStore();

  const [sortedOwners, setSortedOwners] = useState<typeof owners>([]);

  const handleBuy = useCallback((order: IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>) => {
    checkoutNFT(NFT, collection, order);
  }, [NFT, collection]);

  useEffect(() => {
    setSortedOwners(sortOwners([...owners]))
  }, [owners]);

  return (
    <Box>
      {sortedOwners.map(({ owner, address, order, value: ownedAmount }, i) => {
        const [color1, color2] = getStrGradient(address);

        return (
          <NFTTabItemWrapper key={i} label={i === 0 && !!order ? 'Lowest ask' : undefined}>
            <HStack spacing={'16px'}>
              {!!owner?.profileImageUrl
                ? (<Image src={owner.profileImageUrl} {...s.Image} />)
                : (<Box {...s.Image} bgGradient={`linear(to-br, ${color1}, ${color2})`} />)
              }
              <Box>
                <Text {...s.Name}>{owner?.displayName || formatAddress(address)}</Text>
                <Text {...s.Description}>
                  {ownedAmount}/{totalEditions}
                  {!order
                    ? (<> editions<Box {...s.Price}> not for sale</Box></>)
                    : (<> on sale for <Box {...s.Price}> {order.take.value} ETH</Box> each</>)
                  }
                </Text>
              </Box>
            </HStack>
            {!!order && (<Button boxShadow={'lg'} onClick={() => handleBuy(order)}>Buy</Button>)}
          </NFTTabItemWrapper>
        );
      })}
    </Box>
  );
}
