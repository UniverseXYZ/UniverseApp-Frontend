import { Box, BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { INft } from '../../../../types';
import { NFTItemCompositionLabel, NFTItemBundleLabel } from '../nft-item-type-labels';
import { NFTLike } from '../nft-like';
import { NFTItemEditionsLabel } from '../nft-item-editions-label';

interface IStyles {
  wrapper: BoxProps;
}

const styles: IStyles = {
  wrapper: {
    borderTop: '0.5px solid rgba(0, 0, 0, 0.1)',
    pt: '14px',
    display: 'flex',
    fontSize: '12px',
    fontWeight: 600,
    justifyContent: 'space-between',
    color: '#00000066',
  },
};

interface INFTItemFooterProps {
  nft: INft;
  renderNFTAdditions?: React.ReactNode | null;
}

export const NFTItemFooter = (
  {
    nft,
    renderNFTAdditions,
  }: INFTItemFooterProps
) => {
  return (
    <Flex {...styles.wrapper}>
      <Flex>
        {renderNFTAdditions || renderNFTAdditions === null ? renderNFTAdditions : (
          <NFTItemEditionsLabel nft={nft} mr={'6px'} />
        )}
        {nft.tokenIds?.length > 1 && (<NFTItemBundleLabel count={nft.tokenIds.length ?? 0} mr={'6px'} />)}
        {nft.assets?.length && (<NFTItemCompositionLabel count={nft.assets.length ?? 0} mr={'6px'} />)}
      </Flex>

      <Box>
        <NFTLike likes={nft.likes || []} isLiked={nft.isLiked} />
      </Box>
    </Flex>
  );
};
