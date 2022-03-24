import { BoxProps} from '@chakra-ui/react';

export const AssetStyle: BoxProps = {
  sx: {
    'img, video': {
      borderRadius: '4px',
      objectFit: 'cover',
      h: '80px',
      w: '80px',
    }
  }
};
