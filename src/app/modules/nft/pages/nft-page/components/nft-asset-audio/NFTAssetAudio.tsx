import { Box, BoxProps } from '@chakra-ui/react';
import React, { useCallback, useRef } from 'react';
import Lottie from 'react-lottie';
import { useAudio } from 'react-use';

import { LottieOptions } from './constants';
import * as styles from './styles';
import { useAudioAnimation } from './hooks';

interface INFTAssetAudioProps extends BoxProps {
  audio: string;
}

export const NFTAssetAudio = ({ audio: audioUrl, ...rest }: INFTAssetAudioProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <Box {...styles.WrapperStyle} {...rest}>
      <canvas ref={canvasRef} width="32" height="32" style={{ width: '100%', height: '100%'}} />
      <Box {...styles.AudioAnimationContainerStyle} onClick={toggleAudio}>
        <Lottie isPaused={!state.playing} options={LottieOptions} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >{audio}</Box>
    </Box>
  )
}
