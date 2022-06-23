import { BoxProps, MenuButtonProps, MenuItemProps, MenuListProps } from '@chakra-ui/react';

export type IMenuButtonSize = "sm" | "md";

export const MenuButton: MenuButtonProps = {
  background: 'transparent',
  border: 0,
  borderRadius: '6px',
  boxShadow: 'none',
  color: 'black',
  fontSize: '14px',
  fontWeight: 600,
  height: 'auto',
  position: 'relative',
  transition: '50ms ease-in',

  _before: {
    backgroundImage: 'none',
    boxShadow: 'none',
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: 'rgba(0, 0, 0, 0.1)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },

  _hover: {
    _before: {
      bg: 'linear-gradient(101deg,#bceb00,#00eaea)',
    },
  },

  _focus: {
    bg: 'transparent',
  },

  _active: {
    boxShadow: '0px 0px 0px 5px rgba(102, 234, 90, 0.15)',

    _before: {
      bg: 'linear-gradient(101deg,#bceb00,#00eaea)',
    },

    '[data-arrow]': {
      transform: 'rotate(180deg) translateY(0)',
    },
  },

  _disabled: {
    background: 'rgba(0, 0, 0, 0.02)',
    boxShadow: 'none !important',
    color: 'rgba(0, 0, 0, 0.2) !important',
    cursor: 'not-allowed',
    transform: 'scale(1) !important',

    _before: {
      bg: 'rgba(0, 0, 0, 0.1)',
    },

    '[data-icon]': {
      opacity: 0.4,
    },

    _hover: {
      _before: {
        bg: 'rgba(0, 0, 0, 0.1)',
      },
      '[data-arrow]': {
        transform: 'rotate(0deg) translateY(1px)',
      },
    },
  },
}

export const MenuButtonSized: Record<IMenuButtonSize, MenuButtonProps> = {
  sm: {
    padding: "6px 8px",
  },
  md: {
    padding: "10px 8px",
  }
};

export const MenuButtonArrow: BoxProps = {
  transition: '300ms',
  transform: 'translateY(1px)',
};

export const MenuList: MenuListProps = {
  minWidth: '142px',
  padding: '8px',
  position: 'relative',
  zIndex: 3,
};

export const CurrencyItemStyle: MenuItemProps = {
  borderRadius: '6px',
  fontFamily: 'Space Grotesk',
  fontWeight: 500,
  gap: '8px',
  padding: '10px',

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  }
};
