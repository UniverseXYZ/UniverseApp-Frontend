import { BoxProps } from '@chakra-ui/react';

export const WrapperStyle: BoxProps = {
  alignItems: 'center',
  flex: 1,
  fontSize: '12px',

  sx: {
    img: {
      borderRadius: '50%',
      objectFit: 'cover',
      mr: '10px',
      h: '30px',
      w: '30px',
    },
  }
};
