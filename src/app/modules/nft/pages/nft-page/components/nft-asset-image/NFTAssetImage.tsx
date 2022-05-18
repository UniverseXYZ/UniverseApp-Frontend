import { Box, BoxProps } from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useState } from 'react';
import { useMeasure } from 'react-use';

import BrokenNFT from '../../../../../../../components/marketplaceNFT/BrokenNFT';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';
import * as NFTInfoStyles from '../nft-info/NFTInfo.style';
import * as styles from './NFTAssetImage.styles';

interface INFTAssetImageProps {
  image: string;
  alt: string;
  containerProps?: BoxProps;
  allowFullscreen?: boolean;
}

export const NFTAssetImage = (props: INFTAssetImageProps) => {
  const {
    image,
    alt,
    containerProps = {},
    allowFullscreen = true,
  } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const [fullscreen, setFullscreen] = useState(false);
  const [showError, setShowError] = useState(false);

  return showError ? (
    <Box {...NFTInfoStyles.BrokenAssetStyle}>
      <BrokenNFT />
    </Box>
    ) : (
    <>
      <Box ref={ref} {...styles.ImageWrapperStyle} {...containerProps}>
        <NextImage
          src={image}
          alt={alt}
          layout={'fixed'}
          width={width}
          height={width}
          objectFit={'contain'}
          style={{
            cursor: allowFullscreen ? 'zoom-in' : 'default',
          }}
          onClick={() => allowFullscreen && setFullscreen(true)}
          onError={() => setShowError(true)}
        />
      </Box>
      {!showError &&
        <NFTAssetFullscreen isOpen={fullscreen}>
          <NextImage
            src={image}
            alt={alt}
            height={600}
            width={600}
            layout={'fill'}
            objectFit={'contain'}
            style={{
              cursor: 'zoom-out',
            }}
            onClick={() => allowFullscreen && setFullscreen(false)}
          />
        </NFTAssetFullscreen>
      }
    </>
  )
}
