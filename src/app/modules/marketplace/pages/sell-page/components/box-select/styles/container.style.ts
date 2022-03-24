import { BoxProps } from '@chakra-ui/react';

export const ContainerStyle: BoxProps = {
  justifyContent: 'space-between',
  flexDir: {
    base: 'column',
    md: 'row'
  },

  sx: {
    '> div': {
      _notLast: {
        margin: {
          base: '0 0 15px 0',
          md: '0 15px 0 0',
        }
      },
    }
  },
};
