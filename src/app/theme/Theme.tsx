import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';

import { breakpoints, global } from './constants';
// import { Button, Input } from './overrides';

const theme = extendTheme({
  breakpoints,
  styles: { global },

  components: {
    // Input, Button,
  },
});

export const Theme = (props: any) => <ChakraProvider theme={theme} {...props} />;
