import React from 'react';
import Marquee from 'react-fast-marquee';
import './HeroSection.scss';

const HeroSection = () => {
  const marquee = () => (
    <p>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
      <span className="marquee--text--polymorph">POLYMORPH</span>
      <span className="marquee--text--universe">UNIVERSE</span>
    </p>
  );
  return (
    <>
      <div className="general--section">
        <h1>Polymorph Universe</h1>
        <h2>
          The Polymorphs are a collection of morphing NFTs, with 11 base skins and 200+ traits.
        </h2>
        <Marquee gradient={false} className="welcome--marquee">
          <div className="border--top" />
          {marquee()}
        </Marquee>
      </div>
    </>
  );
};

export default HeroSection;
