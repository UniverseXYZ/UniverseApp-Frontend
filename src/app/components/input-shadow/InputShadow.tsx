import { Box } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/layout/src/box';
import React from 'react';

const styles: BoxProps = {
  position: 'relative',
  sx: {
    '&:focus-within:after, &:hover:after': {
      display: 'block',
    }
  },
  _after: {
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
  }
}

export const InputShadow = (props: BoxProps) => (
  <Box {...styles} {...props} />
);
