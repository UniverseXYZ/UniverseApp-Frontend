import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../../../types';

interface INFTItemFooterEditionsLabelProps extends BoxProps {
  NFT: INFT;
}

export const NFTItemFooterEditionsLabel = ({ NFT, children, ...rest }: INFTItemFooterEditionsLabelProps) => {
  return (
    <Box layerStyle={'nft-card-footer-label'} {...rest}>
      <Text>{`x${NFT.tokenIds?.length ?? 1}`}</Text>
    </Box>
  );
};
