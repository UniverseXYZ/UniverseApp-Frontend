import { Box, BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { INFT, NFTStandard } from '../../../../types';
import { NFTLike } from '../nft-like';
import * as styles from './styles';
import {
  NFTItemFooterEditionsLabel,
  NFTItemFooterStandardLabel,
  NFTItemFooterBundleLabel,
  NFTItemFooterCompositionLabel,
} from './components';

interface INFTItemFooterProps extends BoxProps {
  NFT?: INFT;
}

export const NFTItemFooter = (
  {
    NFT,
    children,
    ...rest
  }: INFTItemFooterProps
) => {
  const showLikes = false;

  return (
    <Flex {...styles.WrapperStyle} {...rest}>
      {children ? children : (
        <>
          <Flex>
            <Box sx={{ '> div': { mr: '6px', _last: { mr: 0 } } }}>
              {NFT && <NFTItemFooterStandardLabel NFT={NFT} />}
              {NFT?.standard === NFTStandard.ERC1155 && <NFTItemFooterEditionsLabel NFT={NFT} />}
              {/*TODO: composition*/}
              {/*{NFT.assets?.length && (<NFTItemFooterCompositionLabel count={NFT.assets.length ?? 0} mr={'6px'} />)}*/}
            </Box>
          </Flex>

          <Box>
            {/*TODO: likes*/}
            {showLikes && <NFTLike likes={[]} isLiked={true} />}
          </Box>
        </>
      )}
    </Flex>
  );
};
