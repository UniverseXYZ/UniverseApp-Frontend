import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';

import { LottieOptions } from './constants';
import { R, G, B, fill } from './helpers';
import * as styles from './styles';

export const NFTAssetAudio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      let t = 0;

      const run = () => {
        for (let x = 0; x <= 35; x++) {
          for (let y = 0; y <= 35; y++) {
            fill(context, x, y, R(x, y, t), G(x, y, t), B(x, y, t));
          }
        }
        t = t + 0.04;
        window.requestAnimationFrame(run);
      }

      run();
    }
  }, [canvasRef.current]);

  return (
    <Box {...styles.WrapperStyle}>
      <canvas ref={canvasRef} width="32" height="32" style={{ width: '100%', height: '100%'}} />
      <Box {...styles.AudioAnimationContainerStyle}>
        <Lottie options={LottieOptions} />
      </Box>
    </Box>
  )
}
