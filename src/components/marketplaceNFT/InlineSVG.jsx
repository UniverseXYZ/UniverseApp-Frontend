import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InlineSVG = ({ svgUrl }) => {
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

  return !loading ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <></>;
};

InlineSVG.propTypes = {
  svgUrl: PropTypes.string.isRequired,
};

export default InlineSVG;
