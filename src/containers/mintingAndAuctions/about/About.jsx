import { useEffect } from 'react';
import Welcome from '../../../components/mintingAndAuctions/about/Welcome';
import './About.scss';
import DigitalTools from '../../../components/mintingAndAuctions/about/DigitalTools';
import HowItWorks from '../../../components/mintingAndAuctions/about/howItWorks/HowItWorks';
import OurTeam from '../../../components/mintingAndAuctions/about/OurTeam';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
