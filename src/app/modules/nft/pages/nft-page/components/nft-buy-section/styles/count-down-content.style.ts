import { BoxProps } from '@chakra-ui/react';

export const CountDownContentStyle: BoxProps = {
  bg: 'white',
  borderRadius: 'inherit',
  padding: '5px 15px',
  textAlign: 'center',

  sx: {
    p: {
      _first: {
        fontSize: '14px',
        fontWeight: 700,
      },
    },
    img: {
      display: 'inline',
      mr: '8px',
      mt: '-3px'
    }
  },
};
