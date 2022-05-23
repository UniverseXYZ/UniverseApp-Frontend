import { OpenGraph } from '@app/components';
import OpenGraphImage from '@assets/images/open-graph/polymorphs.png';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useMyNftsStore } from 'src/stores/myNftsStore';
import { useThemeStore } from 'src/stores/themeStore';
import GroupPolymorphWelcome from '../../assets/images/GroupPolymorphWelcome.png';
import About from '../../components/polymorphs/About';
import PolymorphsActivity from '../../components/polymorphs/PolymorphsActivity';
import Section4 from '../../components/polymorphs/Section4';
import Section6 from '../../components/polymorphs/Section6';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import { useErc20PriceStore } from '../../stores/erc20PriceStore';
// import './Polymorphs.scss';
import { morphedPolymorphs, queryPolymorphsGraph } from '../../utils/graphql/polymorphQueries';
import { useGraphQueryHook } from '../../utils/hooks/useGraphQueryHook';


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

const METADATA = {
  title: 'Polymorphs NFT Drop',
  description:
    "A universe of polymorphic creatures with the power to mutate on demand.",
};

const Polymorphs = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const [mobile, setMobile] = useState(false);
  const { data } = useGraphQueryHook(queryPolymorphsGraph(morphedPolymorphs));
  const { polymorphsFilter, navigateToMyUniverseNFTsTab } = useMyNftsStore(s => ({polymorphsFilter: s.polymorphsFilter, navigateToMyUniverseNFTsTab: s.navigateToMyUniverseNFTsTab}))
  const ethUsdPrice = useErc20PriceStore(state => state.ethUsdPrice);
  const windowSize = useWindowSize();
  const router = useRouter();

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
    if (+windowSize.width <= 575) setMobile(true);
  }, [windowSize.width]);

  const redirectToMyPolymorphs = () => {
    navigateToMyUniverseNFTsTab(polymorphsFilter);
    router.push('/my-nfts');
  };

  const schema = {
    "@context": "http://schema.org",
    "@type": "PolymorphsPage",
    name: METADATA.title,
    description:
      METADATA.description,
  };

  return (
    <div className="polymorphs">
      <OpenGraph
        title={METADATA.title}
        description={METADATA.description}
        image={OpenGraphImage}
      />
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
        ethPrice={`${ethUsdPrice}`}
        mobile={mobile}
        morphEntities={data?.tokenMorphedEntities}
      />
      <Section6 />
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
    </div>
  );
};

export default Polymorphs;
