import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { useVideo } from 'react-use';

import * as styles from './styles';

interface INFTAssetVideoProps extends BoxProps {
  video: string;
}

export const NFTAssetVideo = ({ video, ...rest }: INFTAssetVideoProps) => {
  const [videoEl, state, controls, ref] = useVideo(
    <video src={video} width={'100%'} height={240} controls autoPlay loop></video>
  );

  return (<Box {...styles.ContainerStyle} {...rest}>{videoEl}</Box>);
}
