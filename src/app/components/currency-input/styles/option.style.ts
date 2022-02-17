import { MenuItemProps } from '@chakra-ui/react';

export const OptionStyle: MenuItemProps = {
  borderRadius: '5px',
  fontFamily: 'Space Grotesk',
  fontWeight: 500,
  padding: '10px',
  paddingRight: '20px',

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
  _focus: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },

  sx: {
    img: {
      mr: '10px',
    },
  }
};
