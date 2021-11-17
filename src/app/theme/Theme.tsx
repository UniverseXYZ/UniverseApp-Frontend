import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';

import { breakpoints, global } from './constants';
import { Container } from './overrides';

const theme = extendTheme({
  breakpoints,
  styles: { global },
  fontSizes: {
    '4xl': '32px',
  },
  components: {
    Container,
    Heading: {
      baseStyle: {
        fontFamily: 'Sharp Grotesk Medium'
      }
    },
    Button: {
      variants: {
        solid: {
          background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%)',
          borderRadius: '12px',
          padding: '11px 26px',
          fontFamily: 'Space Grotesk',
          fontSize: '16px',
          boxShadow: 'xl',
          _hover: {
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) !important',
          }
        }
      }
    },
  },
});

export const Theme = (props: any) => <ChakraProvider theme={theme} {...props} />;
