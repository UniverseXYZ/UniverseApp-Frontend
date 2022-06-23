import { BoxProps, ImageProps } from '@chakra-ui/react';

export const Item: BoxProps = {
  bg: 'white',
  border: 0,
  borderRadius: '12px',
  boxShadow: 'none',
  color: 'black',
  cursor: 'pointer',
  h: '290px',
  padding: '20px',
  transition: '50ms ease-in',
  position: 'relative',

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

  _active: {
    _before: {
      background: 'linear-gradient(101deg,#bceb00,#00eaea)',
      padding: '2px',
    }
  },

  _focus: {
    boxShadow: 'none',
  },

  sx: {
    _hover: {
      _before: {
        background: 'linear-gradient(101deg,#bceb00,#00eaea)',
      },

      img: {
        transform: 'translateY(-6px)',
      },
    },
    _disabled: {
      background: 'rgba(0, 0, 0, 0.02) !important',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      color: 'rgba(0, 0, 0, 0.6) !important',
      cursor: 'not-allowed',
      transform: 'scale(1) !important',

      _before: {
        display: 'none',
      },

      img: {
        transform: 'translateY(0)',
      },
    },
  },
};

export const Icon: ImageProps = {
  maxW: '72px',
  maxH: '72px',
  pos: 'relative',
  transition: '100ms',
};
