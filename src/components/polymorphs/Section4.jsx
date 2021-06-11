import React, { useLayoutEffect, useEffect, useState } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import './styles/Section4.scss';
import Section4Image from '../../assets/images/Section4-Illustration-min.png';
import Button from '../button/Button.jsx';

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
      <img alt="img" src={Section4Image} />
    </div>
  </AnimatedOnScroll>
);

const rightBlock = () => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
    <div className="section4--right--block">
      <h2>Mint a Polymorphic NFT that will scramble its genes when told to</h2>
      <p>
        Mint a Polymorphic NFT that will scramble its genes when minted or when its told to morph.
      </p>
      <Button className="light-button">Mint now</Button>
    </div>
  </AnimatedOnScroll>
);

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
