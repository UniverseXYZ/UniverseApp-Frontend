import { Image, ImageProps } from '@chakra-ui/react';
import React from 'react';

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
}

export const NFTAssetImage = ({ image, ...rest }: INFTAssetImageProps) => {
  return (
    <Image src={image} {...ImageStyle} {...rest} />
  )
}
