import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../types';
import { NFTItemCompositionLabel, NFTItemBundleLabel } from '../nft-item-type-labels';
import { NFTLike } from '../nft-like';
import { NFTItemEditionsLabel } from '../nft-item-editions-label';
import * as styles from './styles';

interface INFTItemFooterProps {
  nft: INFT;
  renderNFTAdditions?: React.ReactNode | null;
  bundleNFTsLength?: number;
}

export const NFTItemFooter = (
  {
    nft,
    renderNFTAdditions,
    bundleNFTsLength = 0,
  }: INFTItemFooterProps
) => {
  return (
    <Flex {...styles.WrapperStyle}>
      <Flex>
        {renderNFTAdditions || renderNFTAdditions === null ? renderNFTAdditions : (
          <NFTItemEditionsLabel nft={nft} mr={'6px'} />
        )}
        {bundleNFTsLength ? (<NFTItemBundleLabel count={bundleNFTsLength} mr={'6px'} />) : null}
        {/*TODO: composition*/}
        {/*{nft.assets?.length && (<NFTItemCompositionLabel count={nft.assets.length ?? 0} mr={'6px'} />)}*/}
      </Flex>

      <Box>
        {/*TODO: likes*/}
        {/*<NFTLike likes={[]} isLiked={true} />*/}
      </Box>
    </Flex>
  );
};
