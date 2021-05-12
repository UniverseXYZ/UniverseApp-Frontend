import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import ellipses from '../../assets/images/ellipses.svg';

const Welcome = () => (
  <div className="welcome__section">
    <img className="ellipse-l" src={ellipses} alt="Ellipses" />
    <img className="ellipse-r" src={ellipses} alt="Ellipses" />
    <div className="welcome__section__container">
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
        <h1 className="title">Meet the Universe Crew</h1>
      </AnimatedOnScroll>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={1000}>
        <p className="desc">
          Our team is full of creators, artists and DeFi minds from all over the world with a shared
          goal in mind, empower artists.
        </p>
      </AnimatedOnScroll>
    </div>
  </div>
);

export default Welcome;
