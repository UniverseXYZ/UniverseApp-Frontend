import { BoxProps } from '@chakra-ui/react';
import React  from 'react';

export const ImageWrapperStyle: BoxProps = {
  w: '100%',

  sx: {
    'span': {
      maxHeight: '530px !important',
    },
    img: {
      borderRadius: '12px',
      position: 'static !important',
      boxSize: 'auto !important',
    }
  },
};
