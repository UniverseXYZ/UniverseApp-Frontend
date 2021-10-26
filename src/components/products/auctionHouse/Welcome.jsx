import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import ellipses from '../../../assets/images/ellipses.svg';

const Welcome = () => (
  <div className="welcome__section">
    <img className="ellipse-l" src={ellipses} alt="Ellipses" />
    <img className="ellipse-r" src={ellipses} alt="Ellipses" />
    <div className="welcome__section__container">
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
        <h1 className="title">Welcome to the</h1>
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={600}>
        <h1 className="title">Auction House</h1>
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={1000}>
        <p className="desc">Check out creative releases from artists that have partnered with us</p>
      </AnimatedOnScroll>
    </div>
  </div>
);

export default Welcome;
