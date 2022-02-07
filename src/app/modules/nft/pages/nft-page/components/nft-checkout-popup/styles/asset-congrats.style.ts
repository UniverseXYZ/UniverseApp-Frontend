import { BoxProps } from '@chakra-ui/react';

export const AssetCongratsStyle: BoxProps = {
  display: 'table',
  my: '30px',
  mx: 'auto',
  pos: 'relative',

  sx: {
    'img, video': {
      borderRadius: '6px',
      objectFit: 'cover',
      h: '295px',
      w: '295px',
    }
  }
};
