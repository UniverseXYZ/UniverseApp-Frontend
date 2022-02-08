import { Image, ImageProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';

const ImageStyle: ImageProps = {
  borderRadius: '12px',
  objectFit: 'cover',
  maxH: '600px',
  maxW: '600px',
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',
}

interface INFTAssetImageProps extends ImageProps {
  image: string;
  allowFullscreen?: boolean;
}

export const NFTAssetImage = ({ image, allowFullscreen = true, ...rest }: INFTAssetImageProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <Image
        src={image}
        {...ImageStyle}
        cursor={allowFullscreen ? 'zoom-in' : 'default'}
        onClick={() => allowFullscreen && setFullscreen(true)}
        {...rest}
      />
      <NFTAssetFullscreen isOpen={fullscreen}>
        <Image
          src={image}
          borderRadius={0}
          cursor={'zoom-out'}
          maxH={'max'}
          maxW={'max'}
          objectFit={'contain'}
          height={'100vh'}
          width={'100vw'}
          onClick={() => setFullscreen(false)} />
      </NFTAssetFullscreen>
    </>
  )
}
