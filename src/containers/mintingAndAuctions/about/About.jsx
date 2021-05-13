import React, { useEffect, useContext } from 'react';
import Welcome from '../../../components/mintingAndAuctions/about/Welcome';
import './About.scss';
import DigitalTools from '../../../components/mintingAndAuctions/about/DigitalTools';
import HowItWorks from '../../../components/mintingAndAuctions/about/howItWorks/HowItWorks';
import OurTeam from '../../../components/mintingAndAuctions/about/OurTeam';
import AppContext from '../../../ContextAPI';

const About = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(true);
    document.title = 'Universe Minting - Minting & Auctions - About';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return (
    <div className="about__page">
      <Welcome />
      <DigitalTools />
      <HowItWorks />
      <OurTeam />
    </div>
  );
};

export default About;
