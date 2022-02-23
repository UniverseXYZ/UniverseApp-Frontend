import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';

import { breakpoints, global } from './constants';
import * as components from './overrides';

const theme = extendTheme({
  breakpoints,
  styles: { global },
  fontSizes: {
    '4xl': '32px',
  },
  components: {
    ...components,
  },
  layerStyles: {
    grey: {
      background: 'rgba(0, 0, 0, 0.02)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
    },
    'nft-card-footer-label': {
      bg: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      color: 'rgba(0, 0, 0, 0.4)',
      display: 'inline-block',
      padding: '10px',
      lineHeight: '12px',
    },
  },
});

interface IThemeProps {
  children: React.ReactNode;
}

export const Theme = (props: IThemeProps) => <ChakraProvider theme={theme} {...props} />;
