import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Welcome from '../../../components/products/about/Welcome.jsx';
import DigitalTools from '../../../components/products/about/DigitalTools.jsx';
import HowItWorks from '../../../components/products/about/howItWorks/HowItWorks.jsx';
import OurTeam from '../../../components/products/about/OurTeam.jsx';
import { useThemeContext } from '../../../contexts/ThemeContext.jsx';
import Head from 'next/head';

const About = () => {
  const { setDarkMode } = useThemeContext();

  useEffect(() => setDarkMode(true), []);

  return (
    <div className="about__page">
      <Head>
        <title>A Universe Made for Artists by Artists – Universe XYZ</title>
        <meta
          name="description"
          content="Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with multiple NFTs per winner. In this Universe anything is possible."
        />
      </Head>
      <Welcome />
      <DigitalTools />
      <HowItWorks />
      <OurTeam />
    </div>
  );
};
export default About;
