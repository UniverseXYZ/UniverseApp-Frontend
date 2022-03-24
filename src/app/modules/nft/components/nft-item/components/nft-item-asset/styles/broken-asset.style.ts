import { ImageProps } from '@chakra-ui/react';

export const BrokenAssetStyle: (width: string | number) => ImageProps = (width: string | number = 200) => {
  const _width = typeof width === 'number' ? `${width}px` : width;

  return {
    sx: {
      boxSize: _width,
      img: {
        objectFit: 'cover',
        width: '68px',
        height: '68px',
        margin: '0 auto 12px',
      },
    }
  };
};
