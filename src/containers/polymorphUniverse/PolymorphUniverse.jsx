import React from 'react';
import Section4 from '../../components/polymorphs/Section4';
import HeroSection from '../../components/polymorphUniverse/heroSection/HeroSection';
import LatestFeaturesSection from '../../components/polymorphUniverse/latestFeaturesSection/LatestFeaturesSection';
import '../polymorphs/Polymorphs.scss';
import BurnPolymorphBg from '../../assets/images/BurnPolymorphBg.png';
import Section4LeftBackground from '../../assets/images/Section4GroupImage.png';
import BattlePolymorphSection from '../../components/polymorphUniverse/battlePolymorphSection/BattlePolymorphSection';

const PolymorphUniverse = () => (
  <div>
    <HeroSection />
    <LatestFeaturesSection />
    <Section4
      title="Burn to mint"
      hintText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      buttonText="Burn a polymorph"
      backgroundImage={BurnPolymorphBg}
      leftBackground={Section4LeftBackground}
      leftBackgroundMobile={Section4LeftBackground}
    />
    <BattlePolymorphSection />
  </div>
);
export default PolymorphUniverse;
