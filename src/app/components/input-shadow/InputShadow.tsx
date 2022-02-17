import { Box } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/layout/src/box';
import React from 'react';

export const InputShadow = ({ children, ...rest }: BoxProps) => (
  <Box
    sx={{
      position: 'relative',
      'input:focus + div, input:hover + div': {
        display: 'block',
      }
    }}
    {...rest}
  >
    {children}
    <Box sx={{
      content: '" "',
      display: 'none',
      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
      borderRadius: 'inherit',
      filter: 'blur(4px)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1,
    }} />
  </Box>
);
