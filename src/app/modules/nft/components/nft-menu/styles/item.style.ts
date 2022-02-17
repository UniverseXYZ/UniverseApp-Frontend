import { MenuItemProps } from '@chakra-ui/react';

export const ItemStyle: MenuItemProps = {
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 500,
  padding: '15px',
  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
  _focus: {
    bg: 'transparent',
  },
};
