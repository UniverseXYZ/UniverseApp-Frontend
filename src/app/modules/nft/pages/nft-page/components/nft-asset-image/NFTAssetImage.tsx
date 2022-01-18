import { Image } from '@chakra-ui/react';
import React from 'react';

export const NFTAssetImage = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      sx={{
        borderRadius: '12px',
        maxH: '600px',
        maxW: '600px',
        h: 'calc(100vh - 84px - 120px)',
        w: 'calc(100vh - 84px - 120px)',
      }}
    />
  )
}
