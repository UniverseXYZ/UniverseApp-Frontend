import { BoxProps } from '@chakra-ui/react';

export const TextContainerStyle: BoxProps = {
  width: [
    '100%',
    null,
    null,
    'calc(100% - var(--image-size) - var(--image-margin-right))'
  ],
};
