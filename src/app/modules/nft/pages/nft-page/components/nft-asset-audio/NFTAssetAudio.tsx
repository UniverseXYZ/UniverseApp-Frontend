import { Box, BoxProps } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { useAudio } from 'react-use';

import { LottieOptions } from './constants';
import * as styles from './styles';
import { useAudioAnimation } from './hooks';
import { NFTAssetFullscreen } from '../nft-asset-full-screen';

interface INFTAssetAudioProps extends BoxProps {
  audio: string;
  allowFullscreen?: boolean;
}

export const NFTAssetAudio = ({ audio: audioUrl, allowFullscreen = true, ...rest }: INFTAssetAudioProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [fullscreen, setFullscreen] = useState(false);

  const [audio, state, controls] = useAudio({
    src: audioUrl,
    controls: true,
    autoPlay: true,
    loop: true,
  });

  useAudioAnimation(canvasRef.current?.getContext('2d') ?? null, state.playing);

  const toggleAudio = useCallback(() => {
    state.playing ? controls.pause() : controls.play();
  }, [state]);

  return !fullscreen ? (
    <Box {...styles.WrapperStyle} {...rest}>
      <canvas ref={canvasRef} width="32" height="32" style={{ width: '100%', height: '100%'}} />
      <Box
        {...styles.AudioAnimationContainerStyle}
        sx={{
          '> div': {
            cursor: allowFullscreen ? 'zoom-in' : 'default',
          }
        }}
        onClick={() => {
          if (allowFullscreen) {
            setFullscreen(true);
            setTimeout(() => controls.seek(state.time));
          }
        }}
      >
        <Lottie isPaused={!state.playing} options={LottieOptions} />
      </Box>
      <Box {...styles.AudioPlayerContainerStyle}>{audio}</Box>
    </Box>
  ) : (
    <NFTAssetFullscreen isOpen={fullscreen}>
      <Box h={'100vh'} w={'100vw'}>
        <canvas ref={canvasRef} width="32" height="32" style={{ width: '100%', height: '100%'}} />
        <Box
          {...styles.AudioAnimationContainerStyle}
          sx={{
            '> div': {
              cursor: 'zoom-out',
              h: '100vh !important',
              w: '100vw !important',
            }
          }}
          onClick={() => {
            setFullscreen(false);
            setTimeout(() => controls.seek(state.time));
          }}
        >
          <Lottie isPaused={!state.playing} options={LottieOptions} />
        </Box>
        <Box {...styles.AudioPlayerContainerStyle}>{audio}</Box>
      </Box>
    </NFTAssetFullscreen>
  );
}
