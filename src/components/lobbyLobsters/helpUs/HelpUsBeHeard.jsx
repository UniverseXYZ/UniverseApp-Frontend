import React from 'react';
import Lottie from 'react-lottie';
import './HelpUsBeHeard.scss';
import icon from '../../../assets/images/lobby-lobsters/icon_info.svg';
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
          isClickToPauseDisabled
        />
      </div>
      <div className="right--block">
        <h1>Help us be heard</h1>
        <p>
          Lobby Lobsters are shouting from underwater, but nobody hears them... &quot;WE WANT
          DECENTRALIZATION!&quot; Help the Lobby Lobsters get in front of Congress.
        </p>
        <p>
          Lobby Lobsters hope by raising funds, they can help educate the representatives in
          Washington who make the laws around cryptocurrency. They will wear suits for Lobby
          Lobsters!
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
