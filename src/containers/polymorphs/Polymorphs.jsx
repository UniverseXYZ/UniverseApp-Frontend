import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import GroupPolymorphWelcome from '../../assets/images/GroupPolymorphWelcome.png';
import About from '../../components/polymorphs/About';
import Characters from '../../components/polymorphs/Characters';
import Section4 from '../../components/polymorphs/Section4';
import PolymorphsActivity from '../../components/polymorphs/PolymorphsActivity';
import Section6 from '../../components/polymorphs/Section6';
import './Polymorphs.scss';
import { queryAuctions } from '../../utils/graphql/queries';
import AppContext from '../../ContextAPI';

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
  const history = useHistory();
  const [mobile, setMobile] = useState(false);
  const { data } = useQuery(queryAuctions);
  const { ethPrice } = useContext(AppContext);

  useLayoutEffect(() => {
    function handleResize() {
      if (+window.innerWidth <= 575) setMobile(true);
      else setMobile(false);
    }
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (+window.innerWidth <= 575) setMobile(true);
  }, [window.innerWidth]);

  useEffect(() => {}, [data]);

  return (
    <div className="polymorphs">
      <WelcomeWrapper
        title="Polymorph Universe"
        hintText="A universe of polymorphic creatures with the power to mutate on demand"
        popupBtnText="My polymorphs"
        btnText="Mint a morph"
        btnOnClick={() => history.push('/mint-polymorph')}
        btnAnotherOnClick={() => history.push('/my-nfts')}
        ellipsesLeft={false}
        ellipsesRight={false}
        marquee={marquee()}
      >
        <img src={GroupPolymorphWelcome} alt="" />
      </WelcomeWrapper>
      <div className="content">
        <About />
      </div>
      <Characters />
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
