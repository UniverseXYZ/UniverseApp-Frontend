import React from 'react';
import Marquee from 'react-fast-marquee';
import Lottie from 'react-lottie';
import animationData from '../../../utils/animations/polymorph_universe_hero_section_animation.json';
import Arrow from '../../../assets/images/arrow-right.svg';
import './HeroSection.scss';

const HeroSection = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
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
        <div className="lottie--animation">
          <Lottie options={defaultOptions} />
        </div>
        <div className="bg--overlay" />
        <div className="body--text">
          <h1>Polymorph Universe</h1>
          <h2>
            The Polymorphs are a collection of morphing NFTs, with 11 base skins and 200+ traits.
          </h2>
          {/* <button type="button">
            <img src={Arrow} alt="arrow" />
          </button> */}
        </div>
        <Marquee gradient={false} className="welcome--marquee">
          <div className="border--top" />
          {marquee()}
          <div className="border--bottom" />
        </Marquee>
      </div>
    </>
  );
};

export default HeroSection;
