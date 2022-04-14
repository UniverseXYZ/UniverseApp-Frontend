import { BoxProps } from '@chakra-ui/react';

export const ContainerStyle: BoxProps = {
  sx: {
    video: {
      borderRadius: '12px',
      margin: 'auto',
      maxH: 'calc(100vh - 84px - 80px)',

      _fullScreen: {
        objectFit: 'contain',
      },
    }
  }
}
