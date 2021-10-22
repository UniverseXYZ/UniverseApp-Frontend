import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../utils/animations/fire_black_animation.json';

const BurnAnimation = () => (
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
export default BurnAnimation;
