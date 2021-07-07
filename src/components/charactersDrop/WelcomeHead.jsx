import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import char1 from '../../assets/images/character1.png';
import char2 from '../../assets/images/character2.png';
import char3 from '../../assets/images/character3.png';
import vector from '../../assets/images/vector-bottom.svg';
import Button from '../button/Button.jsx';

const WelcomeHead = () => {
  const history = useHistory();

  const handleScroll = () => {
    window.scrollTo(0, 1200);
  };

  return (
    <div className="welcome__section">
      <div className="scroll-part">
        <Button onClick={handleScroll}>
          <img src={vector} alt="vector" /> scroll
        </Button>
      </div>
      <div className="welcome__section__container">
        <div className="left">
          <img src={char1} alt="characters_group" className="char-img1" />
          <img src={char2} alt="characters_group" className="char-img2" />
          <img src={char3} alt="characters_group" className="char-img3" />
          <h1 className="title1">Original</h1>
          <h1 className="title2">Charecters</h1>
          <h1 className="title3">Drop</h1>
          <p className="desc">
            <b>3 Planets</b> with <b>69 Original Characters</b> to the Universe. Each Planet is its
            own Collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHead;
