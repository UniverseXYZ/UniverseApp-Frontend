import { MenuButtonProps } from '@chakra-ui/react';

export const ButtonStyle: MenuButtonProps = {
  background: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  height: '34px',
  padding: '0 10px',
  position: 'absolute',
  right: '8px',
  top: '8px',
  zIndex: 2,

  _hover: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },
  _focus: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },
  _active: {
    boxShadow: 0,
    img: {
      _last: {
        transform: 'rotate(180deg)',
      }
    }
  },

  sx: {
    '> span': {
      display: 'contents',
    },
    img: {
      _last: {
        transition: '200ms',
        ml: '10px',
      }
    },
  }
}
