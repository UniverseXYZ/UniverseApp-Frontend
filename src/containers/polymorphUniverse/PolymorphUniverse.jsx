import React from 'react';
import AboutSection from '../../components/polymorphUniverse/aboutSection/AboutSection';
import HeroSection from '../../components/polymorphUniverse/heroSection/HeroSection';
import './PolymorphUniverse.scss';
import Section4 from '../../components/polymorphs/Section4';
import LatestFeaturesSection from '../../components/polymorphUniverse/latestFeaturesSection/LatestFeaturesSection';
// import '../polymorphs/Polymorphs.scss';
import BurnPolymorphBg from '../../assets/images/BurnPolymorphBg.png';
import Section4LeftBackground from '../../assets/images/Section4GroupImage.png';
import BattlePolymorphSection from '../../components/polymorphUniverse/battlePolymorphSection/BattlePolymorphSection';

const PolymorphUniverse = () => (
  <div className="polymorph--universe--general--page">
    <HeroSection />
    <LatestFeaturesSection />
    <div className="content">
      <AboutSection />
    </div>
    <Section4
      title="Burn to mint"
      hintText="Universe is offering you the oppurtunity to burn your v1 Polymorph  and mint a new one. "
      buttonText="Burn a polymorph"
      backgroundImage={BurnPolymorphBg}
      leftBackground={Section4LeftBackground}
      leftBackgroundMobile={Section4LeftBackground}
    />
    <BattlePolymorphSection />
  </div>
);
export default PolymorphUniverse;
