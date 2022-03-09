import { BoxProps } from '@chakra-ui/react';

export const getItemWrapperStyle: (isBundle: boolean) => BoxProps = (isBundle) => ({
  borderRadius: '12px',
  cursor: 'pointer',
  position: 'relative',

  // shadow
  _before: {
    borderRadius: 'inherit',
    content: '""',
    h: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    w: '100%',
    zIndex: 2,
    transition: '100ms',
  },

  // border
  _after: {
    background: 'rgba(0, 0, 0, 0.1)',
    backgroundOrigin: 'border-box',
    border: '1px solid transparent',
    borderRadius: 'inherit',
    boxShadow: 'inset 2px 1000px 1px #fff',
    content: '""',
    h: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    w: '100%',
    zIndex: 2,
  },

  _selected: {
    _after: {
      background: 'white !important',
    },
  },

  _hover: {
    '&:before, [data-layer]:before': {
      boxShadow: `0px 0px 30px rgba(0, 0, 0, ${isBundle ? 0.1 : 0.2})`,
    },
    '&:after, [data-layer]:after': {
      background: 'transparent',
      border: 0,
    },
    '& .buy-now': {
      display: 'block'
    },
    '& .nft-label': {
      display: 'block'
    }
  },
});
