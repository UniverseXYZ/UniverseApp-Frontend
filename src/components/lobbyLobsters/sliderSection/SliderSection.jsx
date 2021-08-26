import React from 'react';
import './SliderSection.scss';
import SkinsAnimation from './animations/SkinsAnimation';
import AttributesAnimation from './animations/AttributesAnimation';
import MissionAnimation from './animations/MissionAnimation';
import SliderComponent from './SliderComponent';

const SliderSection = () => (
  <div className="lobby--lobsters--slider--section">
    <div className="lobby--lobsters--slider--section--wrapper">
      <div className="lobby--lobsters--slider--section--wrapper--container">
        <div className="grid">
          <SkinsAnimation />
          <AttributesAnimation />
          <MissionAnimation />
        </div>
      </div>
    </div>
    <SliderComponent />
  </div>
);
export default SliderSection;
