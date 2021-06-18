import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import BondingCurve from '../../components/polymorphs/mint-polymorph/BondingCurve';
import Section3Randomise from '../../components/polymorphs/mint-polymorph/Section3Randomise';
import './MintPolymorph.scss';

const MintPolymorph = () => {
  const [sliderValue, settSliderValue] = useState(3);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (+window.innerWidth <= 576) setMobile(true);
    else setMobile(false);
  }, [mobile]);

  useLayoutEffect(() => {
    function handleResize() {
      if (+window.innerWidth <= 576) setMobile(true);
      else setMobile(false);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <div className="mint--polymorph">
      <WelcomeWrapper
        title="Mint Polymorph"
        hintText="Here is where we will mint Polymorphs. Polymorphs are completely random. Once you own a Polymorph the items can be morphed again multiple times to your liking."
        ellipsesLeft={false}
        ellipsesRight={false}
        // bgTextLeft
        // bgTextRight
      >
        <BondingCurve value={sliderValue} />
      </WelcomeWrapper>
      <Section2HorizontalScroll />
      <Section3Randomise mobile={mobile} />
      <div className="section4">
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <div className="section4--child">
            <BondingCurve value={sliderValue} colorPriceIcon="black" />
            {/* <div className="background--vertical--text--block">
              <p>pellentesque.</p>
            </div> */}
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default MintPolymorph;
