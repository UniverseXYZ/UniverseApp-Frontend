import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../utils/animations/flames_animation.json';

const BackgroundFlamesAnimation = () => (
  <Lottie
    options={{
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }}
    isClickToPauseDisabled
  />
);
export default BackgroundFlamesAnimation;
