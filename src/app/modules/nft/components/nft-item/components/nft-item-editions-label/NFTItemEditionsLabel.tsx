import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../types';

const styles: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  color: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  padding: '10px',
  lineHeight: '12px',
}

interface INFTItemEditionsLabelProps extends BoxProps {
  nft: INFT;
}

export const NFTItemEditionsLabel = ({ nft, children, ...rest }: INFTItemEditionsLabelProps) => {
  return (
    <Box {...styles} {...rest}>
      {children ? children : <Text>{`${nft.tokenIds?.length ?? 0}/${nft.numberOfEditions}`}</Text>}
    </Box>
  );
};
