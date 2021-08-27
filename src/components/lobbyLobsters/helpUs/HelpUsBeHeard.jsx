import React from 'react';
import Lottie from 'react-lottie';
import './HelpUsBeHeard.scss';
import icon from '../../../assets/images/lobby-lobsters/info-icon.png';
import animationData from '../../../utils/animations/megaphone_lobster_animation.json';

const HelpUsBeHeard = () => (
  <div className="helpus--general--section">
    <div className="helpus--general--section--container">
      <div className="left--block">
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
      <div className="right--block">
        <h1>Help us be heard</h1>
        <p>
          Cryptocurrency has been in the news a lot lately, currently we have a few ways to be
          heard. We hope that rasing this money can get us representitives in Washington that can
          help the industry as a hole.
        </p>
        <div className="info--box">
          <div className="icon--section">
            <img src={icon} alt="icon" />
          </div>
          <div className="text--section">
            <h2>We want to see policy efforts that help crypto, not prevent it from growing.</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default HelpUsBeHeard;
