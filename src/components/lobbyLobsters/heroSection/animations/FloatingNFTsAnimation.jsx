import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../utils/animations/nfts_floating_animation.json';

const FloatingNFTsAnimation = () => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }}
    isClickToPauseDisabled
  />
);

export default FloatingNFTsAnimation;
