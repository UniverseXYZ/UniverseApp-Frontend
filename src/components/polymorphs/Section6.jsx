import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import Section6LeftImg from '../../assets/images/Section6-Illustration-min.png';
import Button from '../button/Button.jsx';

import './styles/Section6.scss';

const leftBlock = () => (
  <div>
    <img alt="img" src={Section6LeftImg} />
  </div>
);

const rightBlock = () => (
  <div>
    <div className="coming-soon">Coming soon</div>
    <h2>Make your own Morphing NFTs</h2>
    <p>
      We want you to also be able to mint your own morphing creations. We just need some time to set
      it up.
    </p>
  </div>
);

const Section6 = () => (
  <>
    <div className="polymorphs--section6">
      <WrapperCenter className="wrapper--center--section6--two-columns">
        <WrapperCenterTwoColumns leftBlock={leftBlock()} rightBlock={rightBlock()} />
      </WrapperCenter>
    </div>
    <div className="section6--end--block--parent">
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
        <div className="section6--end--block">
          <h2>Now it’s time to mint your own unique polymorph</h2>
          <Button className="light-button">Mint a morph</Button>
        </div>
      </AnimatedOnScroll>
    </div>
  </>
);

export default Section6;
