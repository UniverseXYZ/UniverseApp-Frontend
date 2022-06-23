import { ButtonProps, LinkProps, MenuItemProps } from '@chakra-ui/react';

export const IconLink: LinkProps = {
  color: 'white',
  boxShadow: 'none !important',
  opacity: 0.6,

  _hover: {
    opacity: 1
  },
};

export const MenuButton: ButtonProps = {
  borderColor: 'rgba(255 255 255 / 10%)',
  color: 'white',
  padding: '11px 9px',

  _hover: {
    borderColor: 'rgba(255 255 255 / 30%)',
    color: 'white',
  },
};

export const MenuItem: MenuItemProps = {
  fontSize: '14px',
};
