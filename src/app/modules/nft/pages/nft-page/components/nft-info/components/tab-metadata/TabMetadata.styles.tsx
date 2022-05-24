import { LinkProps, StackProps, TextProps } from '@chakra-ui/react';

export const HashStyle: TextProps & LinkProps = {
  color: '#4D66EB',
  cursor: 'pointer',

  _focus: {
    boxShadow: 'none',
  },
};

export const ItemStyle: StackProps = {
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  fontWeight: 500,
  justifyContent: 'space-between',
  padding: '18px 24px',
  w: '100%',
};
