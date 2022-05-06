import { BoxProps } from '@chakra-ui/react';

export const Badge: BoxProps = {
  bg: 'rgba(0 0 0 / 10%)',
  borderRadius: '4px',
  color: 'rgba(0 0 0 / 20%)',
  fontSize: '10px',
  fontWeight: 700,
  ml: '8px',
  padding: '2px 4px',

  _selected: {
    bg: '#000000',
    color: '#FFFFFF',
  }
};
