import { BoxProps } from '@chakra-ui/react';
import React  from 'react';

const ArrowBoxBaseStyles: BoxProps = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',

  sx: {
    img: {
      h: '22px',
      w: '10px',
      opacity: 0.4,
    },
  },

  _hover: {
    cursor: 'pointer',
    img: {
      opacity: 1,
    }
  },
};

export const LeftArrowBoxBaseStyles: BoxProps = {
  ...ArrowBoxBaseStyles,
  bg: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)',
  left: 0,
  pr: '20px',
};

export const RightArrowBoxBaseStyles: BoxProps = {
  ...ArrowBoxBaseStyles,
  bg: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,1) 100%)',
  right: 0,
  pl: '20px',
};
