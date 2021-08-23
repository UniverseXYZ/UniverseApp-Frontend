import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import PolymorphGroupFire from '../../assets/images/PolymorphGroupFire.png';
import AppContext from '../../ContextAPI';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import PolymorphsActivity from '../../components/polymorphs/PolymorphsActivity';
import BurnPolymorphLeft from '../../assets/images/bgElementLeft.png';
import BurnPolymorphRight from '../../assets/images/bgElementRight.png';
import Section4LeftBackground from '../../assets/images/Section4GroupImage.png';
import BurnPolymorphBg from '../../assets/images/BurnPolymorphBg.png';
import Section4 from '../../components/polymorphs/Section4';
import data from '../../utils/fixtures/newPolymorphBaseSkins';
import './BurnToMint.scss';

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
  const { setDarkMode } = useContext(AppContext);
  const history = useHistory();
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
    <div className="burn--to--mint">
      <WelcomeWrapper
        title="Burn To Mint"
        hintText="Burn your v1 Polymorph & mint a new one"
        btnText="Burn a Polymorph"
        btnOnClick={() => history.push('/my-nfts')}
        ellipsesLeft={false}
        ellipsesRight={false}
        bgTextLeft
        bgTextRight
        backgroundLeftImage={BurnPolymorphLeft}
        backgroundRightImage={BurnPolymorphRight}
        marquee={marquee()}
      >
        <img src={PolymorphGroupFire} alt="" />
      </WelcomeWrapper>
      <Section2HorizontalScroll
        width={windowSize.width}
        height={windowSize.height}
        title="New polymorph base skins"
        desktopHeightValue={452}
        mobileHeightValue={657}
        data={data}
      />
      <Section4
        title="Burn your polymorph"
        hintText="Universe if offering you the oppurtunity to burn your v1 Polymorph  and mint a new one."
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
