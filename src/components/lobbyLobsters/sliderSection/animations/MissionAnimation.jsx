import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../utils/animations/mission_animation.json';

const MissionAnimation = () => (
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

export default MissionAnimation;
