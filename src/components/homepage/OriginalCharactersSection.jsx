import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Lottie from 'react-lottie';
import animationData from '../../utils/animations/cards_animation.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const OriginalCharactersSection = () => (
  <div className="about__section">
    <div className="about__section__container characters__and__lore">
      <div className="blocks diff">
        <AnimatedOnScroll
          animationIn="fadeIn"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Lottie options={defaultOptions} />
        </AnimatedOnScroll>
        <AnimatedOnScroll animationIn="fadeIn">
          <span className="coming__soon">Coming soon</span>
          <h1 className="title">Universe Original Characters and Lore</h1>
          <p className="desc">
            The initial Core Collection will be released to showcase the ease of use for aspiring
            artists to build and release their own NFT franchise using the features of the Universe
            Protocol. The Core Collection provides an example for aspiring artists for how to build
            out your franchise using the features of the Universe Protocol.
          </p>
        </AnimatedOnScroll>
      </div>
    </div>
  </div>
);

export default OriginalCharactersSection;
