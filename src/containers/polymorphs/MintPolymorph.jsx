import React, { useState } from 'react';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import BondingCurve from '../../components/polymorphs/mint-polymorph/BondingCurve';
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
      <div className="section4">
        <div className="section4--child">
          <BondingCurve value={sliderValue} />
          {/* <div className="background--vertical--text--block">
            <p>pellentesque.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MintPolymorph;
