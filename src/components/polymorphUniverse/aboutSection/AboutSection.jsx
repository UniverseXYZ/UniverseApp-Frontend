import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import WrapperCenterTwoColumns from '../../polymorphs/WrapperCenterTwoColumns';
import ImgRow1 from '../../../assets/images/Section1-Illustration-min.png';
import ImgRow2Chart from '../../../assets/images/chart-min1.svg';
import ImgRow2Background from '../../../assets/images/curve-bg.jpg';
import './AboutSection.scss';
import Button from '../../button/Button';

const row1RightBlock = () => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
    <h2>What are Polymorphs?</h2>
    <p>
      We believe that Polymorphs are the beginning of what will be a wave of technically advanced
      NFTs for the Web3 ecosystem. Like many collections before us, Polymorphs exist with rarity and
      traits but with a spin. They can morph on command from their owners to change the appearance
      of them over time.
    </p>
  </AnimatedOnScroll>
);

const row2LeftBlock = () => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
    <h2>Polymorph Rarity Chart</h2>
    <p>MIirror, mirror on the wall, who has the rarest Polymorph of them all?</p>
    <Button className="light-button">Rarity chart</Button>
  </AnimatedOnScroll>
);

const AboutSection = () => (
  <>
    <WrapperCenter className="about--wrapper--row1">
      <WrapperCenterTwoColumns
        leftBlock={
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
            <img alt="img" src={ImgRow1} />
          </AnimatedOnScroll>
        }
        rightBlock={row1RightBlock()}
        rightClassName="new--technology"
        leftClassName="polymorph--section1--row1--left--block"
      />
    </WrapperCenter>
    <WrapperCenter className="about--wrapper--row2">
      <WrapperCenterTwoColumns
        rightBlock={
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
            <div className="images--charts--parent">
              <img alt="img" src={ImgRow2Chart} className="dominant--image" />
              <img alt="img" src={ImgRow2Background} className="row2--background" />
            </div>
          </AnimatedOnScroll>
        }
        leftBlock={row2LeftBlock()}
        leftClassName="released--left--block"
        rightClassName="relased--right--block"
      />
    </WrapperCenter>
  </>
);

export default AboutSection;
