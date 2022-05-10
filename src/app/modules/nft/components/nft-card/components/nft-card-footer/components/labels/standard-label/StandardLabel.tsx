import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { NFTStandard } from '@app/modules/nft/types';

const STANDARDS_LABELS: Record<NFTStandard, string> = {
  [NFTStandard.ERC721]: 'ERC-721',
  [NFTStandard.ERC1155]: 'ERC-1155',
};

interface IStandardLabelProps extends BoxProps {
  standard: NFTStandard;
}

export const StandardLabel = ({ standard, ...rest }: IStandardLabelProps) => {
  return (
    <Box layerStyle={'NFTCardFooterLabel'} {...rest}>
      <Text>{`${STANDARDS_LABELS[standard]}`}</Text>
    </Box>
  );
};
