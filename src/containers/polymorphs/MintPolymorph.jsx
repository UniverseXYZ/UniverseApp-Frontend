import React, { useState } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import BondingCurve from '../../components/polymorphs/mint-polymorph/BondingCurve';
import Section3Randomise from '../../components/polymorphs/mint-polymorph/Section3Randomise';
import './MintPolymorph.scss';

const MintPolymorph = () => {
  const [sliderValue, settSliderValue] = useState(3);
  return (
    <div className="mint--polymorph">
      <WelcomeWrapper
        title="Mint Polymorph"
        hintText="Here is where we will mint Polymorphs. Polymorphs are completely random. Once you own a Polymorph the items can be morphed again multiple times to your liking."
        ellipsesLeft={false}
        ellipsesRight={false}
      >
        <BondingCurve value={sliderValue} />
      </WelcomeWrapper>
      <Section2HorizontalScroll />
      <Section3Randomise />
      <div className="section4">
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <div className="section4--child">
            <BondingCurve value={sliderValue} />
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
