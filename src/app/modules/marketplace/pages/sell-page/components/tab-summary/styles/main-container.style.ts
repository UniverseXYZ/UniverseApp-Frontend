import { BoxProps } from '@chakra-ui/react';

export const MainContainerStyle: BoxProps = {
  alignItems: 'center',
  bg: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 36px rgba(136, 120, 172, 0.14)',
  fontSize: '14px',
  flexDir: {
    base: 'column',
    lg: 'row',
  },
  mb: '40px',
  padding: {
    base: '20px',
    md: '50px'
  },

  sx: {
    '--image-size': {
      base: '100%',
      lg: '290px',
      xl: '430px',
    },
    '--image-margin-right': {
      base: '0',
      lg: '40px',
    },

    h4: {
      fontFamily: 'Space Grotesk',
      fontSize: '18px',
      mb: '6px'
    },
  },
};
