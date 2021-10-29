import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';

const SVGImageLoader = ({ svgUrl }) => {
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSvg = async () => {
    const loadedSvg = await fetch(svgUrl);
    const svgText = await loadedSvg.text();
    setSvg(svgText);
    setLoading(false);
  };
  useEffect(() => {
    loadSvg();
    return () => {
      setLoading(false);
    };
  }, [svgUrl]);

  return !loading ? <InlineSVG src={svg} /> : <></>;
};

SVGImageLoader.propTypes = {
  svgUrl: PropTypes.string.isRequired,
};

export default SVGImageLoader;
