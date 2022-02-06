import { Image, ImageProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';

const ImageStyle: ImageProps = {
  borderRadius: '12px',
  objectFit: 'cover',
  cursor: 'zoom-in',
  maxH: '600px',
  maxW: '600px',
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',
}

interface INFTAssetImageProps extends ImageProps {
  image: string;
}

export const NFTAssetImage = ({ image, ...rest }: INFTAssetImageProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <Image src={image} {...ImageStyle} onClick={() => setFullscreen(true)} {...rest} />
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
