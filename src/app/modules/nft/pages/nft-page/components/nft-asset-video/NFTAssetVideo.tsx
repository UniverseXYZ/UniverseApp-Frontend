import { AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import React from 'react';

const VideoStyle: AspectRatioProps = {
  objectFit: 'cover',
  maxH: '600px',
  maxW: '600px',
  h: 'calc(100vh - 84px - 120px)',
  w: 'calc(100vh - 84px - 120px)',

  sx: {
    video: {
      borderRadius: '12px',
    }
  }
}

interface INFTAssetVideoProps extends AspectRatioProps {
  video: string;
}

export const NFTAssetVideo = ({ video, ...rest }: INFTAssetVideoProps) => {
  return (
    <AspectRatio ratio={1} {...VideoStyle} {...rest}>
      <video src={video} width={320} height={240} controls autoPlay loop></video>
    </AspectRatio>
  )
}
