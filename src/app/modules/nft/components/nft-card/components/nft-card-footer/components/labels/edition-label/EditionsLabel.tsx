import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

interface IEditionsLabelProps extends BoxProps {
  amount: number;
}

export const EditionsLabel = ({ amount, ...rest }: IEditionsLabelProps) => {
  return (
    <Box layerStyle={'NFTCardFooterLabel'} {...rest}>
      <Text>{`x${amount}`}</Text>
    </Box>
  );
};
