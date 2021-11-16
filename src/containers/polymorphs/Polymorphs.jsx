import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import GroupPolymorphWelcome from '../../assets/images/GroupPolymorphWelcome.png';
import About from '../../components/polymorphs/About';
import Characters from '../../components/polymorphs/Characters';
import Section4 from '../../components/polymorphs/Section4';
import PolymorphsActivity from '../../components/polymorphs/PolymorphsActivity';
import Section6 from '../../components/polymorphs/Section6';
// import './Polymorphs.scss';
import { morphedPolymorphs, queryPolymorphsGraph } from '../../utils/graphql/polymorphQueries';
import { useGraphQueryHook } from '../../utils/hooks/useGraphQueryHook';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';

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

const Polymorphs = () => {
  const { setDarkMode } = useThemeContext();
  const [mobile, setMobile] = useState(false);
  const { data } = useGraphQueryHook(queryPolymorphsGraph(morphedPolymorphs));
  const { polymorphsFilter, navigateToMyUniverseNFTsTab } = useMyNftsContext();
  const { ethPrice } = useAuthContext();
  useLayoutEffect(() => {
    function handleResize() {
      if (+window.innerWidth <= 575) setMobile(true);
      else setMobile(false);
    }
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    setDarkMode(true);
  }, []);

  useEffect(() => {
    if (+window.innerWidth <= 575) setMobile(true);
  }, [window.innerWidth]);

  const redirectToMyPolymorphs = () => {
    navigateToMyUniverseNFTsTab(polymorphsFilter);
  };
  return (
    <div className="polymorphs">
      <WelcomeWrapper
        title="Polymorph Universe"
        hintText="A universe of polymorphic creatures with the power to mutate on demand"
        popupBtnText="My Polymorphs"
        btnText="Mint a morph"
        btnOnClick={redirectToMyPolymorphs}
        btnAnotherOnClick={redirectToMyPolymorphs}
        ellipsesLeft={false}
        ellipsesRight={false}
        marquee={marquee()}
      >
        <img src={GroupPolymorphWelcome} alt="" />
      </WelcomeWrapper>
      <div className="content">
        <About />
      </div>
      {/* <Characters /> */}
      <Section4 />
      <PolymorphsActivity
        ethPrice={ethPrice?.market_data?.current_price?.usd.toString()}
        mobile={mobile}
        morphEntities={data?.tokenMorphedEntities}
      />
      <Section6 />
    </div>
  );
};

export default Polymorphs;
