import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Welcome from '../../../components/mintingAndAuctions/about/Welcome';
import './About.scss';
import DigitalTools from '../../../components/mintingAndAuctions/about/DigitalTools';
import HowItWorks from '../../../components/mintingAndAuctions/about/howItWorks/HowItWorks';
import OurTeam from '../../../components/mintingAndAuctions/about/OurTeam';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about__page">
      <MetaTags>
        <title>A Universe Made for Artists by Artists – Universe XYZ</title>
        <meta
          name="description"
          content="Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with multiple NFTs per winner. In this Universe anything is possible."
        />
      </MetaTags>
      <Welcome />
      <DigitalTools />
      <HowItWorks />
      <OurTeam />
    </div>
  );
};
export default About;
