import { BoxProps } from '@chakra-ui/react';

export const TextContainerStyle: BoxProps = {
  width: 'calc(100% - var(--image-size) - var(--image-margin-right))',

  sx: {
    img: {
      display: 'inline',
      ml: 2,
      mr: 1,
    },
  },
};
