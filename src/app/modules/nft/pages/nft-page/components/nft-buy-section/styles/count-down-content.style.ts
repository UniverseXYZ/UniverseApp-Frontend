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
      _last: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '10px',
        fontWeight: 500,
      },
    },
    img: {
      display: 'inline',
      mr: '8px',
      mt: '-5px'
    }
  },
};
