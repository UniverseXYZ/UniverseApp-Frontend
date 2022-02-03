import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../types';
import { NFTItemCompositionLabel, NFTItemBundleLabel } from '../nft-item-type-labels';
import { NFTLike } from '../nft-like';
import { NFTItemEditionsLabel } from '../nft-item-editions-label';
import * as styles from './styles';

interface INFTItemFooterProps {
  NFT: INFT;
  renderNFTAdditions?: React.ReactNode | null;
  bundleNFTsLength?: number;
}

export const NFTItemFooter = (
  {
    NFT,
    renderNFTAdditions,
    bundleNFTsLength = 0,
  }: INFTItemFooterProps
) => {
  return (
    <Flex {...styles.WrapperStyle}>
      <Flex>
        {/*<Button size={'sm'} mr={'5px'} borderRadius={'8px'}>Buy now</Button>*/}
        {renderNFTAdditions || renderNFTAdditions === null ? renderNFTAdditions : (
          <NFTItemEditionsLabel nft={NFT} mr={'6px'} />
        )}
        {bundleNFTsLength ? (<NFTItemBundleLabel count={bundleNFTsLength} mr={'6px'} />) : null}
        {/*TODO: composition*/}
        {/*{NFT.assets?.length && (<NFTItemCompositionLabel count={NFT.assets.length ?? 0} mr={'6px'} />)}*/}
      </Flex>

      <Box>
        {/*TODO: likes*/}
        <NFTLike likes={[]} isLiked={true} />
      </Box>
    </Flex>
  );
};
