import React from 'react';
import AboutSection from '../../components/polymorphUniverse/aboutSection/AboutSection';
import HeroSection from '../../components/polymorphUniverse/heroSection/HeroSection';
import './PolymorphUniverse.scss';
import BurnYourPolymorphSection from '../../components/polymorphs/BurnYourPolymorphSection';
import LatestFeaturesSection from '../../components/polymorphUniverse/latestFeaturesSection/LatestFeaturesSection';
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
    <BurnYourPolymorphSection
      title="Burn to mint"
      hintText="Polymorph holders are invited to burn their original NFTs to mint brand new ones. Same base skin, same traits but with a brand new look."
      buttonText="Burn a polymorph"
      backgroundImage={BurnPolymorphBg}
      leftBackground={Section4LeftBackground}
      leftBackgroundMobile={Section4LeftBackground}
    />
    <BattlePolymorphSection />
  </div>
);
export default PolymorphUniverse;
