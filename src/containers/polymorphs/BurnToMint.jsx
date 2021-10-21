import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import PolymorphsActivity from '../../components/polymorphs/PolymorphsActivity';
import Section4LeftBackground from '../../assets/images/Section4GroupImage.png';
import BurnPolymorphBg from '../../assets/images/BurnPolymorphBg.png';
import Section4 from '../../components/polymorphs/Section4';
import data from '../../utils/fixtures/newPolymorphBaseSkins';
import './BurnToMint.scss';
import { useThemeContext } from '../../contexts/ThemeContext';
import BurnToMintHeroSection from '../../components/polymorphs/mint-polymorph/BurnToMintHeroSection';

const marquee = () => (
  <p>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
    <span className="marquee--text--polymorph">POLYMORPH</span>
    <span className="marquee--text--universe">UNIVERSE</span>
  </p>
);

const BurnToMint = () => {
  const { setDarkMode } = useThemeContext();
  const history = useHistory();
  const [mobile, setMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && ref.current.readyState === 4) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loaded]);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (+window.innerWidth <= 576) setMobile(true);
    else setMobile(false);
  }, []);

  return (
    <div className="burn--to--mint">
      <BurnToMintHeroSection marquee={marquee()} />
      <Section2HorizontalScroll
        width={windowSize.width}
        height={windowSize.height}
        title="New polymorph base skins"
        desktopHeightValue={452}
        mobileHeightValue={1200}
        data={data}
      />
      <Section4
        title="Burn your polymorph"
        hintText={[
          'Let’s burn your Polymorph and create a new one! Same base skin, same traits - but a brand new 3D look.',
          'Although your Polymorph will be burned for a 3D version, it’s still a Polymorph. You’ll be able to scramble and battle your Polymorph and it’ll still be eligble for future cosmetic upgrades such as this.',
          'Let’s BURN🔥.',
        ]}
        buttonText="Burn a polymorph"
        backgroundImage={BurnPolymorphBg}
        leftBackground={Section4LeftBackground}
        leftBackgroundMobile={Section4LeftBackground}
      />
      <PolymorphsActivity mobile={mobile} title="Burn To Mint Activity" />
    </div>
  );
};

export default BurnToMint;
