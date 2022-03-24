import { Box, Image, ImageProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import BrokenNFT from '../../../../../../../components/marketplaceNFT/BrokenNFT';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';
import * as styles from "../nft-info/styles/broken-asset.style";

interface INFTAssetImageProps extends ImageProps {
  image: string;
  allowFullscreen?: boolean;
}

const ImageStyle: ImageProps = {
  borderRadius: '12px',
  objectFit: 'cover',
  maxH: {sm: '335px', md: '600px'},
  maxW: {sm: '335px', md: '600px'},
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',
}


export const NFTAssetImage = ({ image, allowFullscreen = true, ...rest }: INFTAssetImageProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [showError, setShowError] = useState(false);

  return showError ? <Box {...styles.BrokenAssetStyle}>
    <BrokenNFT />
    </Box>
   : (
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
