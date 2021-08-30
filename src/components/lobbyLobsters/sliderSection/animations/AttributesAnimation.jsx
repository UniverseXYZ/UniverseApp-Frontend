import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../utils/animations/attributes_animation.json';

const AttributesAnimation = () => (
  <div className="lottie--animation">
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
  </div>
);

export default AttributesAnimation;
