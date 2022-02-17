import { BoxProps } from '@chakra-ui/react';

export const FeesContainerStyle: BoxProps = {
  color: '#00000066',
  mb: '30px',
  p: '28px 30px',
  w: '100%',

  sx: {
    '> div': {
      _last: {
        color: 'black',
        fontWeight: 'bold',
      },
    },
  },
};
