import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Welcome from '../../../components/mintingAndAuctions/about/Welcome.jsx';
import './About.scss';
import DigitalTools from '../../../components/mintingAndAuctions/about/DigitalTools.jsx';
import HowItWorks from '../../../components/mintingAndAuctions/about/howItWorks/HowItWorks.jsx';
import OurTeam from '../../../components/mintingAndAuctions/about/OurTeam.jsx';
import { useThemeContext } from '../../../contexts/ThemeContext.jsx';

const About = () => {
  const { setDarkMode } = useThemeContext();
  useEffect(() => {
    setDarkMode(true);
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
