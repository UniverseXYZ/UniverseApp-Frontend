import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
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
  }, []);
  return (
    <div className="about__page">
      <Helmet>
        <title>A Universe Made for Artists by Artists – Universe XYZ</title>
        <meta
          name="description"
          content="Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with multiple NFTs per winner. In this Universe anything is possible."
        />
      </Helmet>
      <Welcome />
      <DigitalTools />
      <HowItWorks />
      <OurTeam />
    </div>
  );
};
export default About;
