import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { INFT, NFTStandard } from '../../../../../../types';

const STANDARDS_LABELS: Record<NFTStandard, string> = {
  [NFTStandard.ERC721]: 'ERC-721',
  [NFTStandard.ERC1155]: 'ERC-1155',
};

interface INFTItemFooterStandardLabelProps extends BoxProps {
  NFT: INFT;
  isOwner: boolean;
  showBuyNowButton?: boolean;
}

export const NFTItemFooterStandardLabel = ({ NFT, children, isOwner, showBuyNowButton, ...rest }: INFTItemFooterStandardLabelProps) => {
  const boxClassName = !isOwner && showBuyNowButton ? 'nft-label' : '';
  return (
    <Box className={boxClassName} layerStyle={'nft-card-footer-label'} {...rest}>
      <Text>{`${STANDARDS_LABELS[NFT.standard]}`}</Text>
    </Box>
  );
};
