import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../utils/animations/endless_wave_animation.json';

const EndlessWaveAnimation = () => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }}
  />
);

export default EndlessWaveAnimation;
