import React from 'react';
import AboutSection from '../../components/polymorphUniverse/aboutSection/AboutSection';
import HeroSection from '../../components/polymorphUniverse/heroSection/HeroSection';
import './PolymorphUniverse.scss';

const PolymorphUniverse = () => (
  <div className="polymorph--universe--general--page">
    <HeroSection />
    <div className="content">
      <AboutSection />
    </div>
  </div>
);
export default PolymorphUniverse;
