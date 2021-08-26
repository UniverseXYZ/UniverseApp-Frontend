import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../utils/animations/skins_animation.json';

const SkinsAnimation = () => (
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
    />
  </div>
);

export default SkinsAnimation;
