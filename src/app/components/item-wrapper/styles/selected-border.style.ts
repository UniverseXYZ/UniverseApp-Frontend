import { BoxProps } from '@chakra-ui/react';

export const SelectedBorderStyle: BoxProps = {
  bg: 'linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%)',
  borderRadius: '14px',
  boxShadow: 'none !important',
  display: 'none',
  height: `calc(100% + 4px)`,
  left: `-2px`,
  position: 'absolute',
  top: `-2px`,
  width: `calc(100% + 4px)`,
  zIndex: 2,

  _selected: {
    display: 'block',
  }
};
