import React, { useLayoutEffect, useEffect, useState } from 'react';
import './styles/Characters.scss';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Button from '../button/Button.jsx';
import Section3LeftImageBrowser from '../../assets/images/polymorph-Section3 - Left-characters-(desktop)-min.png';
import Section3RightImageBrowser from '../../assets/images/polymorph-Section3 - Right-characters-(desktop)-min.png';

const getWindow = (width, changeStateFunc) => {
  if (+width > 834) changeStateFunc('browser');
  else if (+width <= 834 && +width > 575) changeStateFunc('table');
  else if (+width <= 575) changeStateFunc('mobile');
};

const Characters = () => {
  const [windows, setWindows] = useState('browser');
  const [section3Images, setSection3Images] = useState({
    left: Section3LeftImageBrowser,
    right: Section3RightImageBrowser,
  });

  useLayoutEffect(() => {
    function handleResize() {
      getWindow(window.innerWidth, setWindows);
    }
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    getWindow(window.innerWidth, setWindows);
  }, [windows]);

  return (
    <div className="polymorphs--characters">
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
        <div className="polymorph--section3--left--block">
          <img alt="img" src={section3Images.left} />
        </div>
        {console.log(windows)}
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
        <div className="polymorph--section3--center--block">
          <div className="section3--center--child--block">
            <h2>10 characters and 40+ traits</h2>
            <p>Our original characters need no introduction</p>
            <Button className="light-button">Mint polymorph</Button>
          </div>
        </div>
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
        <div className="polymorph--section3--right--block">
          <img src={section3Images.right} alt="img" />
        </div>
      </AnimatedOnScroll>
    </div>
  );
};

export default Characters;
