import { Image } from '@chakra-ui/react';
import React from 'react';

export const NFTAssetImage = () => {
  return (
    <Image
      src={'https://storage.googleapis.com/lobster-images/05020905000503.jpg'}
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
