import { AspectRatioProps } from '@chakra-ui/react';

export const ContainerStyle: AspectRatioProps = {
  objectFit: 'cover',
  maxH: '600px',
  maxW: '600px',
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',

  sx: {
    video: {
      borderRadius: '12px',
    }
  }
}
