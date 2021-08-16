import React, { useLayoutEffect, useEffect, useState } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import './styles/Section4.scss';
import mobilebackground from '../../assets/images/mobilebackground.png';
import tabletbackground from '../../assets/images/topmorph.png';
import Button from '../button/Button';

const getWindow = (width, changeStateFunc) => {
  if (+width > 834) changeStateFunc('browser');
  else if (+width <= 834 && +width > 575) changeStateFunc('table');
  else if (+width <= 575) changeStateFunc('mobile');
};

const leftBlock = (windows) => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
    <div
      className="section4--left--block"
      style={windows === 'mobile' ? { height: window.innerWidth } : {}}
    >
      <img alt="mobile" src={mobilebackground} className="show--on--mobile" />
      <img alt="tablet" src={tabletbackground} className="show--on--tablet" />
    </div>
  </AnimatedOnScroll>
);

const rightBlock = () => {
  const history = useHistory();
  return (
    <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
      <div className="section4--right--block">
        <div className="coming--soon">COMING SOON</div>
        <h2>Polymorph Rarity Chart</h2>
        <p>Mirror, mirror on the wall, who has the rarest Polymorph of them all?</p>
        <Button className="light-button" onClick={() => history.push('/polymorph-rarity')}>
          Rarity chart
        </Button>
      </div>
    </AnimatedOnScroll>
  );
};

const Section4 = () => {
  const [windows, setWindows] = useState('browser');
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    function handleResize() {
      getWindow(window.innerWidth, setWindows);
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    getWindow(window.innerWidth, setWindows);
  }, [width]);

  return (
    <div className="polymorph--section4">
      <WrapperCenter className="polymorph--wrapper--center--section4">
        <WrapperCenterTwoColumns leftBlock={leftBlock(windows)} rightBlock={rightBlock()} />
      </WrapperCenter>
    </div>
  );
};

export default Section4;
