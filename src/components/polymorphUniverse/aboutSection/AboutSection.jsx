import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import WrapperCenterTwoColumns from '../../polymorphs/WrapperCenterTwoColumns';
import ImgRow1 from '../../../assets/images/Section1-Illustration-min.png';
import './AboutSection.scss';
import Button from '../../button/Button';
import imgRow2Chart from '../../../assets/images/universelandscape.png';

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

const row2LeftBlock = () => {
  const history = useHistory();
  return (
    <>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
        <h2>Polymorph Rarity Chart</h2>
        <p>MIirror, mirror on the wall, who has the rarest Polymorph of them all?</p>
        <Button className="light-button" onClick={() => history.push('/polymorph-rarity')}>
          Rarity chart
        </Button>
      </AnimatedOnScroll>
    </>
  );
};

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
              <img src={imgRow2Chart} alt="img" />
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
