import { Image, ImageProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import BrokenNFT from '../../../../../../../components/marketplaceNFT/BrokenNFT';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';

const ImageStyle: ImageProps = {
  borderRadius: '12px',
  objectFit: 'cover',
  maxH: {sm: '335px', md: '600px'},
  maxW: {sm: '335px', md: '600px'},
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',
}

interface INFTAssetImageProps extends ImageProps {
  image: string;
  allowFullscreen?: boolean;
}

export const NFTAssetImage = ({ image, allowFullscreen = true, ...rest }: INFTAssetImageProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [showError, setShowError] = useState(false);

  return showError ? <BrokenNFT /> : (
    <>
      <Image
        src={image}
        {...ImageStyle}
        cursor={allowFullscreen ? 'zoom-in' : 'default'}
        onClick={() => allowFullscreen && setFullscreen(true)}
        {...rest}
        onError={() => setShowError(true)}
      />
      {!showError &&
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
      }
    </>
  )
}
