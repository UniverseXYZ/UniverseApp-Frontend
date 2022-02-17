import { Box } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/layout/src/box';
import React from 'react';

export const GreyBox = ({ children, ...rest }: BoxProps) => (
  <Box
    background={'rgba(0, 0, 0, 0.02)'}
    border={'1px solid rgba(0, 0, 0, 0.1)'}
    borderRadius={'10px'}
    w={'100%'}
    {...rest}
  >{children}</Box>
);
