import { ImageProps } from '@chakra-ui/react';

export const AssetStyle: (width: string | number) => ImageProps = (width: string | number = 200) => {
  const _width = typeof width === 'number' ? `${width}px` : width;

 return {
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
