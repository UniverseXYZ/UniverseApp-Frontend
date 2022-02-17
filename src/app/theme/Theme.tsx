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
});

export const Theme = (props: any) => <ChakraProvider theme={theme} {...props} />;
