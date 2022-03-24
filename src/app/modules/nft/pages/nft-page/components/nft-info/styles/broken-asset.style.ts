import { BoxProps } from '@chakra-ui/react';

export const BrokenAssetStyle: BoxProps = {
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',
  _before: {
    borderRadius: '12px',
  },
  sx: {
    img: {
      h: '68px',
      w: '68px',
      m: 'auto',
      mb: '12px',
    }
  }
};
