import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../../../types';

interface INFTItemFooterEditionsLabelProps extends BoxProps {
  NFT: INFT;
  isOwner: boolean;
}

export const NFTItemFooterEditionsLabel = ({ NFT, children, isOwner, ...rest }: INFTItemFooterEditionsLabelProps) => {
  const boxClassName = !isOwner ? 'nft-label' : '';
  return (
    <Box className={boxClassName} layerStyle={'nft-card-footer-label'} {...rest}>
      <Text>{`x${NFT.tokenIds?.length ?? 1}`}</Text>
    </Box>
  );
};
