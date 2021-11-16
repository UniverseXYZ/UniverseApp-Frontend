import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import BrokenNFT from './BrokenNFT';

const SVGImageLoader = ({ svgUrl }) => {
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const loadSvg = async () => {
    try {
      const loadedSvg = await fetch(svgUrl);
      const svgText = await loadedSvg.text();
      setSvg(svgText);
      setLoading(false);
    } catch (err) {
      setHasErrored(true);
    }
  };
  useEffect(() => {
    loadSvg();
    return () => {
      setLoading(false);
    };
  }, [svgUrl]);

  return hasErrored ? <BrokenNFT /> : !loading ? <InlineSVG src={svg} /> : <></>;
};

SVGImageLoader.propTypes = {
  svgUrl: PropTypes.string.isRequired,
};

export default SVGImageLoader;
