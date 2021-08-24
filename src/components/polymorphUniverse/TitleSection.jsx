import React from 'react';
import Marquee from 'react-fast-marquee';
import './TitleSection.scss';
import PropTypes from 'prop-types';

const TitleSection = (props) => {
  const { marquee } = props;
  return (
    <>
      <div className="general--section">
        <h1>Polymorph Universe</h1>
        <h2>
          The Polymorphs are a collection of morphing NFTs,with 11 base skins and 200+ traits.
        </h2>
        {marquee && (
          <Marquee gradient={false} className="welcome--marquee">
            <div className="border--top" />
            {marquee}
          </Marquee>
        )}
      </div>
    </>
  );
};
TitleSection.propTypes = {
  marquee: PropTypes.node,
};

TitleSection.defaultProps = {
  marquee: null,
};
export default TitleSection;
