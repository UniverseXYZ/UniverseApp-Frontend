import React from 'react';
import './BattlePolymorphSection.scss';
import battlePolymorphImage from '../../../assets/images/battle-polymorph-section-image.png';
import Button from '../../button/Button';

const battlePolymorphSection = () => (
  <div className="battle--polymorph--section">
    <div className="battle--polymorph--section--container">
      <div className="grid">
        <div>
          <h1>Battle your Polymorph</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip. Duis aute irure dolor quam diolor lorem
            sit.
          </p>
          <Button className="light-button">Battle now</Button>
        </div>
        <div>
          <img src={battlePolymorphImage} alt="Battle polymorph" />
        </div>
      </div>
    </div>
  </div>
);

export default battlePolymorphSection;
