import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

export const TabLabel = (props: BoxProps) => {
  return (
    <Box
      sx={{
        bg: 'black',
        borderRadius: '4px',
        color: 'white',
        fontSize: '10px',
        padding: '2px 4px',
        ml: '12px',
      }}
      {...props}
    />
  );
}
