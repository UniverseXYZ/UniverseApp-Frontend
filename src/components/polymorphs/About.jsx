import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import ImgRow1 from '../../assets/images/Section1-Illustration-min.png';
import ImgRow2Chart from '../../assets/images/chart-min1.svg';
import ImgRow2Background from '../../assets/images/curve-bg.jpg';
import './styles/About.scss';

const row1RightBlock = () => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
    <h2>New technology</h2>
    <p>
      A first in the Universe and on the blockchain, we’ve built technology that allows you to
      scramble your Polymorph’s characteristics at random. When you mint, you will get a random skin
      that is permanent. All the traits and wearables can be scrambled at random.
    </p>
  </AnimatedOnScroll>
);

const row2LeftBlock = () => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
    <h2>Released via Distribution Curve</h2>
    <p>
      The Polymorphs will cost .0777 ETH per Polymorph. The full scramble feature is a fixed cost of
      .01 ETH which scrambles all the traits except the base skin. The single trait morph is on a
      rising price curve that gets reset after you fully scramble.
    </p>
  </AnimatedOnScroll>
);

const About = () => (
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

export default About;
