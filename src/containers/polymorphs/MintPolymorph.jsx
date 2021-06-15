import React, { useState } from 'react';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import HorizontalRangeSlider from '../../components/ui-elements/HorizontalRangeSlider';
import Button from '../../components/button/Button';
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
        <div className="welcome--slider--bonding--curve">
          <div className="row1">
            <div className="alert--info">
              <p>
                The Bonding Curve contract will mint you an original Polymorph. This base skin will
                be permanent but the traits and items will be morphable at any time.
              </p>
            </div>
            <h5>Bonding curve</h5>
            <p>
              12500/25000
              <span> Minted</span>
            </p>
          </div>
          <HorizontalRangeSlider
            value={sliderValue}
            setValue={settSliderValue}
            labelLeft="0.1 ETH"
            labelRight="24 ETH"
            className="mint--polymorph--welcome--slider"
            min={0.1}
            max={24}
            step={0.1}
          />
          <Button className="light-button">Mint now</Button>
        </div>
      </WelcomeWrapper>
    </div>
  );
};

export default MintPolymorph;
