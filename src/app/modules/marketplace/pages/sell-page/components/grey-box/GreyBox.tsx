import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const GreyBox = (props: BoxProps) => (
  <Box
    background={'rgba(0, 0, 0, 0.02)'}
    border={'1px solid rgba(0, 0, 0, 0.1)'}
    borderRadius={'10px'}
    w={'100%'}
    {...props}
  />
);
