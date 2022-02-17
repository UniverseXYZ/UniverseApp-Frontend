import { AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import React from 'react';
import { useVideo } from 'react-use';

import * as styles from './styles';

interface INFTAssetVideoProps extends AspectRatioProps {
  video: string;
}

export const NFTAssetVideo = ({ video, ...rest }: INFTAssetVideoProps) => {
  const [videoEl, state, controls, ref] = useVideo(
    <video src={video} width={320} height={240} controls autoPlay loop></video>
  );

  return (
    <AspectRatio ratio={1} {...styles.ContainerStyle} {...rest}>
      {videoEl}
    </AspectRatio>
  )
}
