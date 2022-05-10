import { ImageProps, StackProps } from '@chakra-ui/react';

type IGetFunc<T> = (width: string | number) => T;

export const getAssetStyle: IGetFunc<ImageProps> = (width: string | number = 200) => {
  const _width = typeof width === 'number' ? `${width}px` : width;

  return {
    display: 'flex',

    sx: {
      img: {
        boxSize: _width,
        objectFit: 'cover',
      },
      video: {
        boxSize: _width,
        objectFit: 'cover',
      },
    }
  };
};

export const getBrokenAssetStyle: IGetFunc<ImageProps> = (width: string | number = 200) => {
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

export const AssetTypeContainer: StackProps = {
  position: 'absolute',
  top: '14px',
  left: '14px',
};
