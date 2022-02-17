import { Box, BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { NFTItemBindings } from '../nft-item-bindings';
import { NFTItemStorybookLabel, NFTItemBundleLabel } from '../nft-item-type-labels';
import { NFTLike } from '../nft-like';

import { INft } from '../../../../types';

interface INFTItemHeaderProps {
  nft: INft;
  wrapperProps?: BoxProps;
}

export const NFTItemHeader = ({ nft, wrapperProps }: INFTItemHeaderProps) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} fontSize={'12px'} {...wrapperProps}>
      <NFTItemBindings creator={nft.creator} collection={nft.collection} owner={nft.owner} />

      <Flex>
        {nft.tokenIds?.length > 1 && (<NFTItemBundleLabel count={nft.tokenIds.length ?? 0} />)}
        {nft.assets?.length && (<NFTItemStorybookLabel count={nft.assets.length ?? 0} />)}
        <NFTLike likes={nft.likes} isLiked={nft.isLiked} />
      </Flex>
    </Box>
  );
};
