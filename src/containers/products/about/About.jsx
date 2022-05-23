import { OpenGraph } from "@app/components";
import OpenGraphImage from "@assets/images/open-graph/about-us.png";
import React, { useEffect } from "react";
import { useThemeStore } from "src/stores/themeStore";
import DigitalTools from "../../../components/products/about/DigitalTools.jsx";
import HowItWorks from "../../../components/products/about/howItWorks/HowItWorks.jsx";
import OurTeam from "../../../components/products/about/OurTeam.jsx";
import Welcome from "../../../components/products/about/Welcome.jsx";

const METADATA = {
  title: "A Universe Made for Artists by Artists",
  description:
    "Welcome to a Universe Made for Artists by Artists! Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with multiple NFTs per winner. In this Universe anything is possible.",
};

const About = () => {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);
  useEffect(() => setDarkMode(true), []);

  const schema = {
    "@context": "http://schema.org",
    "@type": "AboutPage",
    name: METADATA.title,
    description: METADATA.description,
  };

  return (
    <div className="about__page">
      <OpenGraph
        title={METADATA.title}
        description={METADATA.description}
        image={OpenGraphImage}
      />
      <Welcome />
      <DigitalTools />
      <HowItWorks />
      <OurTeam />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
    </div>
  );
};
export default About;
