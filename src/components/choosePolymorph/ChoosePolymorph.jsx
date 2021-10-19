import React from 'react';
import { useHistory } from 'react-router-dom';
import './ChoosePolymorph.scss';
import Lottie from 'react-lottie';
import animation from '../../utils/animations/choose_polymorph_animation.json';
import Caroussel3d from './caroussel/Caroussel3d';
import Button from '../button/Button';
import PolymorphCard from '../polymorphCard/PolymorphCard';
import textImage from '../../assets/images/TextBubble.png';

const ChoosePolymorph = () => {
  const history = useHistory();
  return (
    <div className="choose--polymorph">
      <div className="choose--polymorph--container">
        <h1>Choose a Polymorph</h1>
        <p>Select a polymorph you’d like to burn from your wallet.</p>
        <div className="slider--carousel">
          <Caroussel3d />
        </div>
        <div className="button--section">
          <Button className="light-button">Burn a Polymorph</Button>
        </div>
        {/* <div className="no--polymorphs--found--section">
          <img src={textImage} alt="text" />
          <h1>No Polymorphs found</h1>
          <p>Buy Polymorphs on marketplace by clicking the button below</p>
          <Button className="light-button">Go to marketplace</Button>
        </div> */}
      </div>
    </div>
  );
};
export default ChoosePolymorph;
