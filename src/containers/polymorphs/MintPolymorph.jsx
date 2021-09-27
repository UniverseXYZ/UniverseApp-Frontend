import React, { useState, useEffect } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import BondingCurve from '../../components/polymorphs/mint-polymorph/BondingCurve';
import Section3Randomise from '../../components/polymorphs/mint-polymorph/Section3Randomise';
import './MintPolymorph.scss';
import data from '../../utils/fixtures/horizontalScrollCharactersData';
import { useThemeContext } from '../../contexts/ThemeContext';

const MintPolymorph = () => {
  const { setDarkMode } = useThemeContext();
  const [quantity, setQuantity] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setDarkMode(true);
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (+window.innerWidth <= 576) setMobile(true);
    else setMobile(false);
  }, []);

  return (
    <div className="mint--polymorph">
      <WelcomeWrapper
        title="Mint a Morph"
        hintText="Mint a polymorph with its own unique genetic code. Once you have minted a morph, you will be able to scramble and morph its genes as you please. All the traits in a polymorph can be altered by scrambling."
        ellipsesLeft={false}
        ellipsesRight={false}
        bgTextLeft
        bgTextRight
      >
        <BondingCurve
          value={sliderValue}
          setValue={setSliderValue}
          max={30}
          mobile={mobile}
          blur
          quantity={quantity}
          setQuantity={setQuantity}
          light={false}
        />
      </WelcomeWrapper>
      <Section2HorizontalScroll width={windowSize.width} height={windowSize.height} data={data} />
      <Section3Randomise mobile={mobile} />
      <div className="section4">
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <div className="section4--child">
            <BondingCurve
              value={sliderValue}
              setValue={setSliderValue}
              colorPriceIcon="black"
              color1="black"
              color2="black"
              max={30}
              mobile={mobile}
              quantity={quantity}
              setQuantity={setQuantity}
              light
            />
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default MintPolymorph;
