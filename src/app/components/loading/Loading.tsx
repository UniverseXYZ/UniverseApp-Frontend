import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const Loading = (props: BoxProps) => (
  <Box position={'relative'} display={'block'} h={'80px'} {...props}>
    <Box className="lds-roller" transform={'translate(-50%, -50%)'}>
      {Array(8).fill(null).map((_, i) => (<Box key={i} />))}
    </Box>
  </Box>
)
