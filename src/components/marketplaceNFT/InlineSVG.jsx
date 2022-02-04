import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import BrokenNFT from './BrokenNFT';

const SVGImageLoader = ({ svgUrl }) => {
  const [hasErrored, setHasErrored] = useState(false);

  return hasErrored ? (
    <BrokenNFT />
  ) : (
    <ReactSVG
      src={svgUrl}
      fallback={() => <BrokenNFT />}
      afterInjection={(error) => {
        if (error) {
          setHasErrored(true);
        }
      }}
    />
  );
};

SVGImageLoader.propTypes = {
  svgUrl: PropTypes.string.isRequired,
};

export default SVGImageLoader;
