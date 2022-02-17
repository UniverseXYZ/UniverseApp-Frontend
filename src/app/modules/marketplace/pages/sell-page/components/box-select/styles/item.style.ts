import { BoxProps } from '@chakra-ui/react';

export const ItemStyle: BoxProps = {
  bg: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  flex: 1,
  h: '290px',
  p: '20px',
  position: 'relative',
  textAlign: 'center',
  transition: '200ms',

  _disabled: {
    bg: 'rgba(0, 0, 0, 0.02)',

    _hover: {
      bg: 'rgba(0, 0, 0, 0.02)',
      boxShadow: 'none',
      cursor: 'not-allowed',

      _before: {
        display: 'none',
      },

      img: {
        transform: 'translateY(0)'
      },
    },
  },

  _before: {
    background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
    borderRadius: 'inherit',
    content: '""',
    display: 'none',
    filter: 'blur(4px)',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
  },

  _hover: {
    bg: `
        linear-gradient(#ffffff, #ffffff) padding-box, 
        linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
      `,
    boxShadow: 'xl',
    cursor: 'pointer',
    img: {
      transform: 'translateY(-6px)'
    },
    _before: {
      display: 'block',
    }
  },

  sx: {
    img: {
      position: 'relative',
      transition: '100ms'
    },
  },
};
