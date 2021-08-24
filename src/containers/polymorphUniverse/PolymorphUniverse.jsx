import React from 'react';
import TitleSection from '../../components/polymorphUniverse/TitleSection';
import '../polymorphs/Polymorphs.scss';

const PolymorphUniverse = () => {
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
    <div>
      <TitleSection marquee={marquee()} />
    </div>
  );
};
export default PolymorphUniverse;
