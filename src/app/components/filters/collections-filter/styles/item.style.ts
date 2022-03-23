import { BoxProps } from '@chakra-ui/react';

export const ItemStyle: BoxProps = {
  alignItems: 'center',
  borderRadius: '10px',
  display: 'flex',
  fontSize: '14px',
  fontWeight: 500,
  padding: '10px',

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },

  _last: {
    mb: '10px',
  }
};
